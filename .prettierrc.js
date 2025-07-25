module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  bracketSpacing: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
  ],
}; 