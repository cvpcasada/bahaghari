const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isProd = env === 'production';
const isDev = env === 'development';
const isTest = env === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        modules: isTest && `commonjs`,
        loose: true,
        exclude: ['transform-regenerator', 'transform-async-to-generator'],
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    [
      'fast-async',
      {
        compiler: {
          noRuntime: true,
          promises: true,
          transformations: {
            forOf: false,
          },
        },
      },
    ],
    ['lodash', { id: ['lodash', 'ramda'] }],
  ].filter(Boolean),
};
