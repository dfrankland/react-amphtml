module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['rollup.config.js', '**/__tests__/**/*'],
      },
    ],
  },
  plugins: ['jest'],
};
