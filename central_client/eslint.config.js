import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx}'],
        plugins: {
            prettier: prettierPlugin,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            'prettier/prettier': 'error',
            'react/no-unknown-property': ['error', { ignore: ['css'] }],
        },
    },
    eslintConfigPrettier,
];
