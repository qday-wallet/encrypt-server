/* eslint-disable */
module.exports = {
    'env': {
        'commonjs': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:prettier/recommended'
    ],
    'parserOptions': {
        'ecmaVersion': 13
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-unused-vars': [
            'warn'
        ],
        'prettier/prettier': [
            'warn',
            { 'singleQuote': true, 'printWidth': 120 }
        ]
    }
};
