import { NewTag } from '../../rules';
import tagNameToComponentName from '../../tagNameToComponentName';
import { PropsCode } from '../lib/propsCodeReducer';

const propsInterfaceReducer = ({
  componentName,
  dupeName,
  propsCode,
  extensionSpec,
}: {
  componentName: string;
  dupeName?: string;
  propsCode: PropsCode;
  extensionSpec: NewTag['extensionSpec'];
}): string => {
  const propsInterfaceProperties = Object.entries(
    propsCode.propsInterfaceCode,
  ).reduce((acc, [key, value]): string => {
    const optional = /undefined/.test(value) ? '?' : '';
    return `
      ${acc}
      ${key}${optional}: ${value};
    `;
  }, '');
  const versionProperty = extensionSpec
    ? extensionSpec.version.map((v): string => JSON.stringify(v)).join('|')
    : "ScriptProps['version']";
  const exportInterface = dupeName ? '' : 'export';
  return `
    ${exportInterface} interface ${componentName} {
      ${propsInterfaceProperties}
      version?: ${versionProperty};
      on?: string;
    }
  `;
};

const propTypesReducer = ({
  componentName,
  propsCode,
  extensionSpec,
}: {
  componentName: string;
  propsCode: PropsCode;
  extensionSpec: NewTag['extensionSpec'];
}): string => {
  const propTypesEntries = Object.entries(propsCode.propTypesCode);
  if (propTypesEntries.length === 0 && !extensionSpec) return '';
  const versionProperty = extensionSpec
    ? `
      PropTypes.oneOf<'${extensionSpec.version.join(
        "' | '",
      )}'>(${JSON.stringify(extensionSpec.version)})
    `
    : "PropTypes.string as PropTypes.Requireable<Script['version']>";
  const propTypesProperties = propTypesEntries.reduce(
    (acc, [key, value]): string => `
      ${acc}
      ${key}: ${value},
    `,
    '',
  );
  return `
    ${componentName}.propTypes = {
      ${propTypesProperties}
      version: ${versionProperty},
      on: PropTypes.string,
    };
  `;
};

const defaultPropsReducer = ({
  componentName,
  propsCode,
  extensionSpec,
}: {
  componentName: string;
  propsCode: PropsCode;
  extensionSpec: NewTag['extensionSpec'];
}): string => {
  const defaultPropsEntries = Object.entries({
    ...propsCode.defaultPropsCode,
    [JSON.stringify('version')]: JSON.stringify(
      extensionSpec ? extensionSpec.version.slice().pop() : 'latest',
    ),
  });
  if (defaultPropsEntries.length === 0) return '';
  const defaultPropsProperties = defaultPropsEntries.reduce(
    (acc, [key, value]): string => `
      ${acc}
      ${key}: ${value},
    `,
    '',
  );
  return `
    ${componentName}.defaultProps = {
      ${defaultPropsProperties}
    };
  `;
};

export default ({
  code,
  tagName,
  componentName,
  dupeName,
  extensionSpec,
  extensionPropsGiven,
  extensionProps,
  requiresExtensionContext,
  contextArgument,
  propsCode,
}: {
  code: string;
  tagName: string;
  componentName: string;
  dupeName?: string;
  extensionSpec: NewTag['extensionSpec'];
  extensionPropsGiven: boolean;
  extensionProps: {
    extension?: string;
    isCustomTemplate?: boolean;
  };
  requiresExtensionContext: string;
  contextArgument: string;
  propsCode: PropsCode;
}): string => {
  const componentOverrideName = `${componentName}Override`;
  const componentOverrideFileName = tagNameToComponentName(tagName);
  const exportComponent = dupeName ? '' : 'export';
  const propsArgument = 'props';
  const propsSpread = extensionPropsGiven
    ? `{...${propsArgument}, ...${JSON.stringify(extensionProps)}}`
    : propsArgument;
  return `
    ${code}
    import ${componentOverrideName} from './components/${componentOverrideFileName}';
    ${propsInterfaceReducer({
      componentName,
      dupeName,
      propsCode,
      extensionSpec,
    })}
    // @ts-ignore
    ${exportComponent} const ${componentName}: React.FunctionComponent<${componentName}> = (${propsArgument}: ${componentName}${contextArgument}): ReactNode => {
      ${requiresExtensionContext}
      return (
        <${componentOverrideName} {...${propsSpread}} />
      );
    };
    ${propTypesReducer({ componentName, propsCode, extensionSpec })}
    ${defaultPropsReducer({ componentName, propsCode, extensionSpec })}
  `;
};
