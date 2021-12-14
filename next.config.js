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
      })
    }
    return config;
  },
  env: {
    postgresHost: process.env.postgresHost,
    postgresPort: process.env.postgresPort,
    postgresDatabase: process.env.postgresDatabase,
    postgresUser: process.env.postgresUser,
    postgresPassword: process.env.postgresPassword,
    APPLICATION_SECRET: process.env.APPLICATION_SECRET,
    BACKEND_SERVICE: process.env.BACKEND_SERVICE || 'http://localhost:3124',
    ZABBIX_REDIRECT: process.env.ZABBIX_REDIRECT || 'https://z-kmda.kyivcity.gov.ua/zabbix.php?action=dashboard.view',
    USER_INFO_SERVICE: process.env.USER_INFO_SERVICE || 'https://geolocation-db.com/json/',
    SESSION_TTL: process.env.SESSION_TTL || 604800,
  },
  poweredByHeader: false,
};
