import { PropsCode } from '../lib/propsCodeReducer';
import camelCase from '../lib/camelCase';
import { JSX_INTRINSICS } from '../../constants';

const propsInterfaceReducer = ({
  isCustomElement,
  camelCasedTagName,
  componentPropsName,
  propsCode,
}: {
  isCustomElement: boolean;
  camelCasedTagName: string;
  componentPropsName: string;
  propsCode: PropsCode;
}): string => {
  const classProperty = isCustomElement ? 'class?: string | undefined;' : '';
  const propsInterfaceCode = { ...propsCode.propsInterfaceCode };
  const propsInterfaceProperties = Object.entries(propsInterfaceCode).reduce(
    (acc, [key, value]): string => {
      const optional = /undefined/.test(value) ? '?' : '';
      return `
        ${acc}
        ${key}${optional}: ${value};
      `;
    },
    '',
  );
  if (isCustomElement) {
    return `
      export interface ${componentPropsName} extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
        ${propsInterfaceProperties}
        ${classProperty}
        version?: ScriptProps['version'];
        on?: string;
      }
    `;
  }

  return `
    type ${componentPropsName} = {
      ${propsInterfaceProperties}
      ${classProperty}
      version?: ScriptProps['version'];
      on?: string;
    } & JSXIntrinsicElements${camelCasedTagName};
  `;
};

const propTypesReducer = ({
  isCustomElement,
  componentName,
  propsCode,
}: {
  isCustomElement: boolean;
  componentName: string;
  propsCode: PropsCode;
}): string => {
  if (!isCustomElement) return '';
  const propTypesCode = { ...propsCode.propTypesCode };
  const propTypesEntries = Object.entries(propTypesCode);
  if (propTypesEntries.length === 0) return '';
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
      version: PropTypes.string as PropTypes.Requireable<Script['version']>,
      on: PropTypes.string,
    };
  `;
};

const defaultPropsReducer = ({
  componentName,
  propsCode,
}: {
  componentName: string;
  propsCode: PropsCode;
}): string => {
  const defaultPropsEntries = Object.entries(propsCode.defaultPropsCode);
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
  requiresExtensionContext,
  contextArgument,
  propsCode,
}: {
  code: string;
  tagName: string;
  componentName: string;
  dupeName?: string;
  requiresExtensionContext: string;
  contextArgument: string;
  propsCode: PropsCode;
}): string => {
  const componentPropsName = `${componentName}Props`;
  const contextTypes = requiresExtensionContext
    ? `
      ${componentName}.contextTypes = REACT_AMPHTML_CONTEXT;
    `
    : '';
  const propsArgument = 'props';
  const newPropsVar = 'newProps';
  const camelCasedTagName = camelCase(tagName);
  const isCustomElement = !JSX_INTRINSICS[camelCasedTagName];
  const swapClassNameForClass = isCustomElement
    ? `
      let ${newPropsVar} = ${propsArgument};
      if (typeof ${newPropsVar}.className === 'string') {
        const { className, ...restProps } = ${newPropsVar};
        ${newPropsVar} = restProps;
        ${newPropsVar}.class = className;
      }
    `
    : '';
  const propsSpread = isCustomElement ? newPropsVar : propsArgument;
  const exportComponent = dupeName ? '' : 'export';
  const ignoreCustomElement = isCustomElement ? '// @ts-ignore' : '';
  const customElementBoolean = isCustomElement
    ? `
      // Add or remove attributes based on if they are boolean true or false
      ${newPropsVar} = Object.entries(${newPropsVar}).reduce(
        (
          // @ts-ignore
          acc: any,
          [key, value],
        ):
        // @ts-ignore
        any => {
          if (value === true) {
            acc[key] = '';
          } else if (value !== false) {
            acc[key] = value;
          }

          return acc;
        },
        {},
      );
    `
    : '';
  return `
    ${code}
    ${propsInterfaceReducer({
      isCustomElement,
      camelCasedTagName,
      componentPropsName,
      propsCode,
    })}
    ${exportComponent} const ${componentName}: React.FunctionComponent<${componentPropsName}> = (${propsArgument}: ${componentPropsName}${contextArgument}) => {
      ${requiresExtensionContext}
      ${swapClassNameForClass}
      ${customElementBoolean}
      return (
        ${ignoreCustomElement}
        <${tagName.toLowerCase()} {...${propsSpread}} />
      );
    };
    ${propTypesReducer({ isCustomElement, componentName, propsCode })}
    ${defaultPropsReducer({ componentName, propsCode })}
    ${contextTypes}
  `;
};
