const { readFileSync } = require('fs');
const { resolve: resolvePath } = require('path');
const newRules = require('../rules');
const {
  MANDATORY_COMPONENT_OVERRIDES,
  COMPONENT_OVERRIDES,
  BLACKLIST,
} = require('../constants');
const tagNameToComponentName = require('../tagNameToComponentName');

const EXTENSION_TYPE_CUSTOM_TEMPLATE = 'CUSTOM_TEMPLATE';

module.exports = newRules.tags.reduce(
  (
    code,
    {
      tagName,
      dupeName,
      attrs,
      attrLists,
      requiresExtension,
      extensionSpec,
      mandatory,
      mandatoryAncestorSuggestedAlternative,
    },
  ) => {
    if (BLACKLIST[tagName] || mandatoryAncestorSuggestedAlternative)
      return code;

    const componentName = tagNameToComponentName(dupeName || tagName);

    const propsCode = [
      ...attrs,
      ...attrLists.reduce(
        (allAttrFromLists, list) => [
          ...allAttrFromLists,
          ...newRules.directAttrLists[list],
        ],
        [],
      ),
    ]
      .map(attr =>
        attr > 0 ? newRules.attrs[attr] : newRules.internedStrings[-1 * attr],
      )
      .reduce(
        ({ propTypesCode, defaultPropsCode, propsInterfaceCode }, attr) => {
          if (!attr) {
            return {
              propTypesCode,
              defaultPropsCode,
              propsInterfaceCode,
            };
          }

          const attrIsString = typeof attr === 'string';

          const name = attrIsString ? attr : attr.name;
          const mandatoryAttr = attrIsString ? false : attr.mandatory;
          const value = attrIsString ? null : attr.value;

          const newPropTypesCode = `
          ${propTypesCode}
          '${name}': PropTypes.any${mandatoryAttr ? '.isRequired' : ''},
          `;

          const newDefaultPropsCode =
            value === null || typeof value === 'undefined'
              ? defaultPropsCode
              : `
          ${defaultPropsCode}
          '${name}': ${(() => {
                  if (!mandatoryAttr) return null;

                  const type = typeof value;

                  if (type === 'string') {
                    // React is weird, it removes `async` props that are empty strings
                    if (name === 'async') return true;

                    return `'${value}'`;
                  }

                  if (type === 'number' || type === 'boolean') return value;

                  try {
                    if (type === 'object') return JSON.stringify(value);
                  } catch (err) {
                    // Do nothing, return `null`.
                  }

                  return null;
                })()},
          `;

          const newPropsInterfaceCode = `
          ${propsInterfaceCode}
          '${name}'${mandatoryAttr ? '' : '?'}: any;
          `;

          return {
            propTypesCode: newPropTypesCode,
            defaultPropsCode: newDefaultPropsCode,
            propsInterfaceCode: newPropsInterfaceCode,
          };
        },
        {
          propTypesCode: '',
          defaultPropsCode: '',
          propsInterfaceCode: '',
        },
      );

    const requiresExtensionContext = (Array.isArray(requiresExtension)
      ? requiresExtension
      : []
    ).reduce(
      (requiresExtensionContextCode, requiredExtension) =>
        `
        ${requiresExtensionContextCode}
        contextHelper({ context, extension: '${requiredExtension}', version: props.version });
        `,
      '',
    );

    const extensionProps =
      extensionSpec && typeof extensionSpec === 'object'
        ? {
            extension: extensionSpec.name,
            isCustomTemplate:
              extensionSpec.extensionType === EXTENSION_TYPE_CUSTOM_TEMPLATE,
          }
        : false;

    const propsSpread = `{...propsHelper(props${
      extensionProps ? `, ${JSON.stringify(extensionProps)}` : ''
    })}`;

    const contextArgument = `${requiresExtensionContext ? ', context' : ''}`;

    const mandatoryComponentOverride =
      MANDATORY_COMPONENT_OVERRIDES[tagNameToComponentName(tagName)];
    if (mandatoryComponentOverride) {
      return `
        ${code}
        import ${componentName}Override from './components/${tagNameToComponentName(
        tagName,
      )}';
        export const ${componentName} = ${componentName}Override;
        `;
    }

    const componentOverride =
      COMPONENT_OVERRIDES[tagNameToComponentName(tagName)];
    if (!mandatory && componentOverride) {
      return `
        ${code}
        import ${componentName}Override from './components/${tagNameToComponentName(
        tagName,
      )}';

        ${
          dupeName ? '' : 'export'
        } const ${componentName}: React.SFC<${componentName}Props> = (props${contextArgument}): ReactElement => {
          ${requiresExtensionContext}
          return (
            <${componentName}Override ${propsSpread} />
          );
        };

        ${
          extensionSpec && Array.isArray(extensionSpec.version)
            ? `
          export interface ${componentName}Props {
            version: ${extensionSpec.version.map(JSON.stringify).join('|')},
          }

          ${componentName}.propTypes = {
            version: PropTypes.oneOf(${JSON.stringify(extensionSpec.version)}),
          };

          ${componentName}.defaultPropTypes = {
            version: ${JSON.stringify(extensionSpec.version.slice().pop())},
          };
          `
            : ''
        }
        `;
    }

    return `
      ${code}

      export interface ${componentName}Props {

      }

      const ${componentName}: React.SFC<${componentName}Props> = (props${contextArgument}) => {
        ${requiresExtensionContext}
        return (
          <${tagName.toLowerCase()} ${propsSpread} />
        );
      };

      ${
        propsCode.propTypesCode
          ? `
        ${componentName}.propTypes = {
          ${propsCode.propTypesCode}
        };
        `
          : ''
      }

      ${
        propsCode.defaultPropsCode
          ? `
        ${componentName}.defaultProps = {
          ${propsCode.defaultPropsCode}
        };
        `
          : ''
      }

      ${
        requiresExtensionContext
          ? `
        ${componentName}.contextTypes = {
          [CONTEXT_KEY]: PropTypes.shape({
            addExtension: PropTypes.func.isRequired,
          }),
        };
        `
          : ''
      }

      ${dupeName ? '' : `export { ${componentName} };`}
      `;
  },
  readFileSync(resolvePath(__dirname, './preamble.tsx')).toString('utf8'),
);
