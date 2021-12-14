module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: [
    'flowtype',
    'react',
    'jsx-a11y',
  ],
  extends: [
    'plugin:flowtype/recommended',
    'airbnb',
  ],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  env: {
    node: true,
    jest: true,
    jasmine: true,
    browser: true,
    es6: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-trailing-spaces': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    camelcase: 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/require-default-props': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.js',
        ],
      },
    ],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
  },
};
