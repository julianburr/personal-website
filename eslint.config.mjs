import { globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const eslintConfig = tseslint.config(
  {
    ignores: ['**/node_modules', '**/.vercel', '**/.next', '**/out'],
  },

  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],

  {
    files: ['**/*.{ts,tsx,js,mjs}'],
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    rules: {
      // prevent files from creeping over 300 lines
      'max-lines': 'error',

      // run prettier as an ESLint rule
      'prettier/prettier': 'error',

      // align import rules for better auto fixing
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '**/*.{svg,png,jpg,json,md,mdx,txt?raw}',
              group: 'object',
              position: 'after',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
          },
        },
      ],
    },
    settings: {
      'import/internal-regex': '^@/',
    },
  },

  eslintConfigPrettier,

  globalIgnores(['.react-router/**', 'out/**', 'build/**']),
);

export default eslintConfig;
