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
    SESSION_TTL: process.env.SESSION_TTL || 604800,
    APP_PROTOCOL: process.env.APP_PROTOCOL || 'http://',
  },
  poweredByHeader: false,
};
