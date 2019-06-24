import prettier from 'prettier';
import componentCode from './componentCode';
import duplicateWrapperComponentCode from './duplicateWrapperComponentCode';

// For debugging purposes.
// console.log(
//   `
//     ${componentCode}
//     ${duplicateWrapperComponentCode}
//   `
//     .split('\n')
//     .map((line, index): string => `${index + 1}${line}`)
//     .join('\n'),
// );

const code = prettier.format(
  `
  ${componentCode}
  ${duplicateWrapperComponentCode}
  `,
  { parser: 'typescript' },
);

process.stdout.write(code);
