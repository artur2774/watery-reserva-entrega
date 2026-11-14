/** Regras ESLint para JavaScript, JSX e hooks React do projeto. */
import regrasBase from '@eslint/js'
import regrasHooksReact from 'eslint-plugin-react-hooks'

/** Globals usadas pelo navegador e sintaxe JSX são declaradas sem plugins extras. */
export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  regrasBase.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        document: 'readonly',
        window: 'readonly',
        IntersectionObserver: 'readonly',
      },
    },
    plugins: { 'react-hooks': regrasHooksReact },
    rules: {
      ...regrasHooksReact.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]
