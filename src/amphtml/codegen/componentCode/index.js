const { readFileSync } = require('fs');
const { resolve: resolvePath } = require('path');
const newRules = require('../rules');
const { COMPONENT_OVERRIDES, BLACKLIST } = require('../constants');
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
    if (BLACKLIST[tagName] || mandatoryAncestorSuggestedAlternative) return code;

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
    ].map((
      attr => (attr > 0 ? newRules.attrs[attr] : newRules.internedStrings[-1 * attr])
    )).reduce(
      ({ propTypesCode, defaultPropsCode }, attr) => {
        if (!attr) {
          return {
            propTypesCode,
            defaultPropsCode,
          };
        }

        const attrIsString = typeof attr === 'string';

        const name = attrIsString ? attr : attr.name;
        const mandatoryAttr = attrIsString ? false : attr.mandatory;
        const value = attrIsString ? null : attr.value;

        const newPropTypesCode = (
          `
          ${propTypesCode}
          '${name}': PropTypes.any${mandatoryAttr ? '.isRequired' : ''},
          `
        );

        const newDefaultPropsCode = value === null || typeof value === 'undefined' ? (
          defaultPropsCode
        ) : (
          `
          ${defaultPropsCode}
          '${name}': ${(
            (() => {
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
            })()
          )},
          `
        );

        return {
          propTypesCode: newPropTypesCode,
          defaultPropsCode: newDefaultPropsCode,
        };
      },
      {
        propTypesCode: '',
        defaultPropsCode: '',
      },
    );

    const requiresExtensionContext = (
      Array.isArray(requiresExtension) ? requiresExtension : []
    ).reduce(
      (requiresExtensionContextCode, requiredExtension) => (
        `
        ${requiresExtensionContextCode}
        contextHelper({ context, extension: '${requiredExtension}' });
        `
      ),
      '',
    );

    const extensionProps = extensionSpec && typeof extensionSpec === 'object' ? (
      {
        extension: extensionSpec.name,
        isCustomTemplate: extensionSpec.extensionType === EXTENSION_TYPE_CUSTOM_TEMPLATE,
      }
    ) : (
      false
    );

    const propsSpread = (
      `{...propsHelper(props${extensionProps ? `, ${JSON.stringify(extensionProps)}` : ''})}`
    );

    const contextArgument = `${requiresExtensionContext ? ', context' : ''}`;

    const componentOverride = COMPONENT_OVERRIDES[tagNameToComponentName(tagName)];
    if (!mandatory && componentOverride) {
      return (
        `
        ${code}
        import ${componentName}Override from './components/${tagNameToComponentName(tagName)}';
        ${dupeName ? '' : 'export'} const ${componentName} = (props${contextArgument}) => {
          ${requiresExtensionContext}
          return (
            <${componentName}Override ${propsSpread} />
          );
        };
        `
      );
    }

    return (
      `
      ${code}
      const ${componentName} = (props${contextArgument}) => {
        ${requiresExtensionContext}
        return (
          <${tagName.toLowerCase()} ${propsSpread} />
        );
      };

      ${propsCode.propTypesCode ? (
        `
        ${componentName}.propTypes = {
          ${propsCode.propTypesCode}
        };
        `
      ) : ''}

      ${propsCode.defaultPropsCode ? (
        `
        ${componentName}.defaultProps = {
          ${propsCode.defaultPropsCode}
        };
        `
      ) : ''}

      ${requiresExtensionContext ? (
        `
        ${componentName}.contextTypes = {
          [CONTEXT_KEY]: PropTypes.shape({
            addExtension: PropTypes.func.isRequired,
          }),
        };
        `
      ) : ''}

      ${dupeName ? '' : `export { ${componentName} };`}
      `
    );
  },
  readFileSync(resolvePath(__dirname, './preamble.js')).toString('utf8'),
);
