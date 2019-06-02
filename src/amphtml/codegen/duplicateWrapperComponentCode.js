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

    return `
      ${code}
      const ${componentName} = (props) => {
        ${dupeComponentCode}
        return null;
      };

      ${componentName}.propTypes = {
        specName: PropTypes.oneOf(${JSON.stringify(
          Object.values(dupes),
        )}).isRequired,
      };

      export { ${componentName} };
      `;
  },
  '',
);
