const newRules = require('./rules');
const tagNameToComponentName = require('./tagNameToComponentName');

module.exports = Object.entries(newRules.dupes).reduce(
  (code, [tagName, dupes]) => {
    const componentName = tagNameToComponentName(tagName);

    const dupeComponentCode = Object.entries(dupes).reduce(
      (dupeCode, [dupeTagName, specName]) =>
        `
        ${dupeCode}
        if (props.specName === '${specName}') {
          return <${tagNameToComponentName(dupeTagName)} {...props} />
        };
        `,
      '',
    );

    const specNames = Object.values(dupes);

    return `
      ${code}
      export interface ${componentName}Props {
        specName: ${Object.values(dupes)
          .map(JSON.stringify)
          .join('|')};
      }

      const ${componentName}: React.SFC<${componentName}Props> = (props): ReactElement => {
        ${dupeComponentCode}
        return null;
      };

      ${componentName}.propTypes = {
        specName: PropTypes.oneOf(${JSON.stringify(specNames)}).isRequired,
      };

      export { ${componentName} };
      `;
  },
  '',
);
