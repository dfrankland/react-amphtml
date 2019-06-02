const newRules = require('./rules');
const tagNameToComponentName = require('./tagNameToComponentName');
const { MISSING_SCRIPT_EXTENSIONS } = require('./constants');

module.exports = Object.entries(newRules.dupes).reduce(
  (code, [tagName, dupes]) => {
    const componentName = tagNameToComponentName(tagName);

    const {
      dupeCode: dupeComponentCode,
      dupeVersions: dupeComponentVersions,
    } = Object.entries(dupes).reduce(
      ({ dupeCode, dupeVersions }, [dupeTagName, specName]) => {
        const tag = newRules.tags.find(({ dupeName: t }) => t === dupeTagName);
        let versions = null;
        if (
          tag &&
          tag.extensionSpec &&
          Array.isArray(tag.extensionSpec.version)
        ) {
          versions = tag.extensionSpec.version;
          tag.extensionSpec.version.forEach(version => {
            dupeVersions.add(version);
          });
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
      { dupeCode: '', dupeVersions: new Set() },
    );

    const specNames = Object.values(dupes);

    return `
      ${code}
      export interface ${componentName}Props {
        specName: ${Object.values(dupes)
          .concat(componentName === 'Script' ? MISSING_SCRIPT_EXTENSIONS : [])
          .map(JSON.stringify)
          .join('|')};
        ${
          dupeComponentVersions.size > 0
            ? `
              version?: ${[...dupeComponentVersions.values()]
                .map(JSON.stringify)
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
        specName: PropTypes.oneOf(${JSON.stringify(specNames)}).isRequired,
        ${dupeComponentVersions.size > 0 ? 'version: PropTypes.string,' : ''}
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
