module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        //  'airbnb-base', 'prettier'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
    },

    // plugins: ['prettier'],
    // rules: {
    //     'prettier/prettier': 'error',
    // },
}
