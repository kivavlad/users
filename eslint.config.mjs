import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import reactCompiler from 'eslint-plugin-react-compiler';
import sonarjs from 'eslint-plugin-sonarjs';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      'webpack.config.js',
      '*.config.js',
      '*.config.ts',
    ]
  },

  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      prettier,
      'react-compiler': reactCompiler,
      sonarjs,
      'unused-imports': unusedImports,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: true,
        node: { 
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          paths: ['src']
        },
        alias: {
          map: [['@', './src'], ['~', './src']],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-bind': 'off',
      'react/function-component-definition': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-cycle': 'off',
      'no-param-reassign': 'off',
      'no-return-await': 'off',
      'require-await': 'off',
      'no-nested-ternary': 'off',
      'no-unneeded-ternary': 'off',
      'max-depth': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-params': 'off',
      'react/jsx-fragments': 'off',
      'react/jsx-no-useless-fragment': 'off',

      '@typescript-eslint/no-unused-vars': ['warn', {
        vars: 'all',
        varsIgnorePattern: '^_| ^I[A-Z]|^T[A-Z]|^[A-Z][A-Z_]*$|^ReactComponent$|^src$',
        args: 'after-used',
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      'unused-imports/no-unused-imports': 'warn',

      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'curly': ['error', 'multi-line'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'prefer-template': 'warn',
      'object-shorthand': ['warn', 'always'],
      'dot-notation': 'warn',
      'arrow-body-style': ['warn', 'as-needed', {
        requireReturnForObjectLiteral: true
      }],

      '@typescript-eslint/no-magic-numbers': ['warn', {
        ignore: [0, 1, -1, 100, 200, 300, 400, 500, 404, 401, 403, 422, 201],
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreTypeIndexes: true,
      }],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': ['warn', {
        'ts-expect-error': 'allow-with-description',
        minimumDescriptionLength: 5,
      }],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/consistent-type-imports': ['warn', {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
        disallowTypeAnnotations: false,
      }],
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',

      'react-compiler/react-compiler': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'import/no-unresolved': 'error',
      'import/order': ['warn', {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'type'
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: '@/**', group: 'internal', position: 'after' },
          { pattern: '~/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      }],
      'import/no-duplicates': 'error',
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
      'import/no-self-import': 'error',
      'import/export': 'error',

      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },

  {
    files: ['webpack.config.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'warn',
      'no-undef': 'warn',
    },
  },

  prettierConfig,
];