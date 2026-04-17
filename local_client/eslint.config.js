import expo from 'eslint-config-expo';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
    ...expo,
    {
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': 'error', // Shows Prettier issues as ESLint errors
            'react/no-unknown-property': ['error', { ignore: ['className'] }],
        },
    },
    configPrettier, // Disables ESLint rules that might conflict with Prettier
];
