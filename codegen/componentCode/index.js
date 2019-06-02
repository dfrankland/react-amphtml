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

          const newPropTypesCode = {
            ...propTypesCode,
            [JSON.stringify(name)]: `PropTypes.any${
              mandatoryAttr ? '.isRequired' : ''
            }`,
          };

          const newDefaultPropsCode =
            value === null || typeof value === 'undefined'
              ? defaultPropsCode
              : {
                  ...defaultPropsCode,
                  [JSON.stringify(name)]: (() => {
                    if (!mandatoryAttr) return null;

                    const type =
                      Array.isArray(value) && value.length > 0
                        ? typeof value.slice(0, 1).pop()
                        : typeof value;

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
                  })(),
                };

          const newPropsInterfaceCode = {
            ...propsInterfaceCode,
            [JSON.stringify(name)]: `${mandatoryAttr ? '' : '?'}: any;`,
          };

          return {
            propTypesCode: newPropTypesCode,
            defaultPropsCode: newDefaultPropsCode,
            propsInterfaceCode: newPropsInterfaceCode,
          };
        },
        {
          propTypesCode: {},
          defaultPropsCode: {},
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
        : {};

    const propsSpread = `{...propsHelper(props, ${JSON.stringify(
      extensionProps,
    )})}`;

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
    if (componentOverride) {
      return `
        ${code}
        import ${componentName}Override from './components/${tagNameToComponentName(
        tagName,
      )}';

        export interface ${componentName}Props {
          ${
            extensionSpec && Array.isArray(extensionSpec.version)
              ? `
                version?: ${extensionSpec.version
                  .map(JSON.stringify)
                  .join('|')},
              `
              : ''
          }
          [prop: string]: any;
        }

        // @ts-ignore
        ${
          dupeName ? '' : 'export'
        } const ${componentName}: React.FunctionComponent<${componentName}Props> = (props${contextArgument}): ReactNode => {
          ${requiresExtensionContext}
          return (
            <${componentName}Override ${propsSpread} />
          );
        };

        ${
          extensionSpec && Array.isArray(extensionSpec.version)
            ? `
          ${componentName}.propTypes = {
            version: PropTypes.oneOf(${JSON.stringify(extensionSpec.version)}),
          };
          `
            : ''
        }

        // @ts-ignore
        ${componentName}.defaultProps = {
          ${Object.entries({
            ...propsCode.defaultPropsCode,
            ...(extensionSpec && Array.isArray(extensionSpec.version)
              ? {
                  [JSON.stringify('version')]: JSON.stringify(
                    extensionSpec.version.slice().pop(),
                  ),
                }
              : {}),
          }).reduce(
            (acc, [key, value]) => `
              ${acc}
              ${key}: ${value},
            `,
            '',
          )}
        };
        `;
    }

    return `
      ${code}

      ${(() => {
        const propsInterfaceCodeEntries = Object.entries(
          propsCode.propsInterfaceCode,
        );
        return `
          export interface ${componentName}Props {
            ${propsInterfaceCodeEntries.reduce(
              (acc, [key, value]) => `
              ${acc}
              ${key}${value}
            `,
              '',
            )}
            [prop: string]: any;
          }
        `;
      })()}

      const ${componentName}: React.FunctionComponent<${componentName}Props> = (props${contextArgument}) => {
        ${requiresExtensionContext}
        return (
          // @ts-ignore
          <${tagName.toLowerCase()} ${propsSpread} />
        );
      };

      ${(() => {
        const propTypesEntries = Object.entries(propsCode.propTypesCode);
        if (propTypesEntries.length === 0) return '';
        return `
          ${componentName}.propTypes = {
            ${propTypesEntries.reduce(
              (acc, [key, value]) => `
              ${acc}
              ${key}: ${value},
            `,
              '',
            )}
          };
        `;
      })()}

      ${(() => {
        const defaultPropsEntries = Object.entries(propsCode.defaultPropsCode);
        if (defaultPropsEntries.length === 0) return '';
        return `
          ${componentName}.defaultProps = {
            ${defaultPropsEntries.reduce(
              (acc, [key, value]) => `
              ${acc}
              ${key}: ${value},
            `,
              '',
            )}
          };
        `;
      })()}

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
