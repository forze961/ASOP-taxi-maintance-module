const withPWA = require('next-pwa');

const settings = {
  env: {},
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: 'public',
    swSrc: 'service-worker.js',
  },
};

module.exports = process.env.NODE_ENV === 'development' ? settings : withPWA(settings);
