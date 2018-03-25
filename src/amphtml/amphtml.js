// @codegen

const componentCode = require('./codegen/componentCode');
const duplicateWrapperComponentCode = require('./codegen/duplicateWrapperComponentCode');

const code = (
  `
  ${componentCode}
  ${duplicateWrapperComponentCode}
  `
);

// For debugging purposes.
// console.log(code.split('\n').map((line, index) => `${index + 1}${line}`).join('\n'));

module.exports = code;
