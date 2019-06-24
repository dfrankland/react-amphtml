import newRules from './rules';
import tagNameToComponentName from './tagNameToComponentName';
import { MISSING_SCRIPT_EXTENSIONS } from './constants';

export default Object.entries(newRules.dupes).reduce(
  (
    code: string,
    [tagName, dupes]: [string, { [dupeTagName: string]: string }],
  ): string => {
    const componentName = tagNameToComponentName(tagName);

    const {
      dupeCode: dupeComponentCode,
      dupeVersions: dupeComponentVersions,
    } = Object.entries(dupes).reduce(
      (
        {
          dupeCode,
          dupeVersions,
        }: {
          dupeCode: string;
          dupeVersions: Set<string>;
        },
        [dupeTagName, specName]: [string, string],
      ): {
        dupeCode: string;
        dupeVersions: Set<string>;
      } => {
        const tag = newRules.tags.find(
          ({ dupeName: t }: { dupeName?: string }): boolean =>
            t === dupeTagName,
        );
        if (
          tag &&
          tag.extensionSpec &&
          Array.isArray(tag.extensionSpec.version)
        ) {
          tag.extensionSpec.version.forEach(
            (version: string): void => {
              dupeVersions.add(version);
            },
          );
        }

        return {
          dupeCode: `
            ${dupeCode}
            if (props.specName === '${specName}') {
              const { specName: _, ...restProps } = props;
              return (
                // @ts-ignore
                <${tagNameToComponentName(dupeTagName)}
                  {...restProps}
                />
              );
            };
          `,
          dupeVersions,
        };
      },
      { dupeCode: '', dupeVersions: new Set<string>() },
    );

    const specNames = Object.values(dupes);

    return `
      ${code}
      export interface ${componentName}Props {
        specName: ${Object.values(dupes)
          .concat(componentName === 'Script' ? MISSING_SCRIPT_EXTENSIONS : [])
          .map((v): string => JSON.stringify(v))
          .join('|')};
        ${
          dupeComponentVersions.size > 0
            ? `
              version?: ${[...dupeComponentVersions.values()]
                .map((v): string => JSON.stringify(v))
                .join('|')};
            `
            : ''
        }
        [prop: string]: any;
      }

      // @ts-ignore
      const ${componentName}: React.FunctionComponent<${componentName}Props> = (props): ReactNode => {
        ${dupeComponentCode}
        return null;
      };

      // @ts-ignore
      ${componentName}.propTypes = {
        specName: PropTypes.oneOf<'${specNames.join(
          "' | '",
        )}'>(${JSON.stringify(specNames)}).isRequired,
        ${
          dupeComponentVersions.size > 0
            ? `version: PropTypes.oneOf<${[...dupeComponentVersions.values()]
                .map((v): string => JSON.stringify(v))
                .join('|')}>(${JSON.stringify([
                ...dupeComponentVersions.values(),
              ])}),`
            : ''
        }
      };

      // @ts-ignore
      ${componentName}.defaultProps = {
        ${dupeComponentVersions.size > 0 ? "version: 'latest'," : ''}
      };

      export { ${componentName} };
      `;
  },
  '',
);
