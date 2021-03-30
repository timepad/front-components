// module.exports = require('front-shared').linter;
const config = require('front-shared').linter;

// TODO: Изменить основной конфиг, обновить Афишу до новой версии eslint'а и prettier'а
// "prettier/@typescript-eslint" has been merged into "prettier" in eslint-config-prettier 8.0.0.
// https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
config.extends = [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
];

// TODO: Правило @typescript-eslint/interface-name-prefix было удалено, заменить его можно вот так
// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md#enforce-that-interface-names-do-not-begin-with-an-i
config.rules = {
    'prettier/prettier': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    // "@typescript-eslint/interface-name-prefix": ["error", {
    //     "prefixWithI": "always",
    //     "allowUnderscorePrefix": false
    // }],
    '@typescript-eslint/naming-convention': [
        'error',
        {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
                regex: '^I[A-Z]',
                match: true,
            },
        },
    ],
    'no-console': ['error', {allow: ['warn', 'error']}],
    'no-param-reassign': 'error',
    'no-unused-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-empty-interface': ['warn', {allowSingleExtends: true}],
    'react/prop-types': config.rules['react/prop-types'],
};

module.exports = config;
