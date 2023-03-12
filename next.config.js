module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.node = { // eslint-disable-line no-param-reassign
        fs: 'empty',
      };
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        exclude: config.exclude,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: config.inlineImageLimit,
              fallback: require.resolve('file-loader'),
              publicPath: `${config.assetPrefix}/_next/static/images/`,
              outputPath: `${isServer ? '../' : ''}static/images/`,
              name: '[name]-[hash].[ext]',
              esModule: config.esModule || false,
            },
          },
        ],
      });
    }
    return config;
  },
  env: {
    BACKEND_SERVICE: process.env.BACKEND_SERVICE, 
  },
  serverRuntimeConfig: {
    BACKEND_SERVICE: process.env.BACKEND_SERVICE,
  },
  publicRuntimeConfig: {
    BACKEND_SERVICE: process.env.BACKEND_SERVICE,
  },
  poweredByHeader: false,
};
