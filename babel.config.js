module.exports = function(api) {
  var validEnv = ['development', 'test', 'production'];
  var currentEnv = api.env();
  var isDevelopmentEnv = api.env('development');
  var isProductionEnv = api.env('production');
  var isTestEnv = api.env('test');

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      'Please specify a valid `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(currentEnv) +
        '.'
    );
  }

  return {
    presets: [
      isTestEnv && [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
          modules: 'commonjs',
        },
        '@babel/preset-react',
      ],
      (isProductionEnv || isDevelopmentEnv) && [
        '@babel/preset-env',
        {
          forceAllTransforms: true,
          useBuiltIns: 'entry', // Ensures polyfills are added correctly
          corejs: 3, // Uses core-js version 3
          modules: false, // Keeps ESModules as they are
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        '@babel/preset-react',
        {
          development: isDevelopmentEnv || isTestEnv,
          useBuiltIns: true, // Ensures built-ins are included for React
        },
      ],
    ].filter(Boolean),
    plugins: [
      'babel-plugin-macros',
      '@babel/plugin-syntax-dynamic-import',
      isTestEnv && 'babel-plugin-dynamic-import-node',
      '@babel/plugin-transform-destructuring',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      [
        '@babel/plugin-proposal-object-rest-spread',
        {
          useBuiltIns: true,
        },
      ],
      [
        '@babel/plugin-proposal-private-methods',
        {
          loose: true,
        },
      ],
      [
        '@babel/plugin-transform-private-property-in-object',
        {
          loose: true,
        },
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: false,
          regenerator: true, // Includes support for generator functions
          corejs: false,
        },
      ],
      isProductionEnv && [
        'babel-plugin-transform-react-remove-prop-types',
        {
          removeImport: true,
        },
      ],
      // Adding async generator support (to handle issues with `for...of` loops)
      '@babel/plugin-proposal-async-generator-functions',
      '@babel/plugin-transform-async-to-generator', // Ensures async code is correctly transpiled
    ].filter(Boolean),
  };
};
