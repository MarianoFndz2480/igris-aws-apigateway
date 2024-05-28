exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    ignorePatterns: ['**/*.js', '**/*.json', '.serverless/*', 'db/**'],
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        // Aquí puedes agregar reglas personalizadas o modificar las existentes
    },
}
