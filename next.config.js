const withPWA = require('next-pwa');

const settings = {
  env: {
    BACKEND_SERVICE: process.env.BACKEND_SERVICE,
    FRONTEND_SERVICE: process.env.FRONTEND_SERVICE,
  },
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: 'public',
    swSrc: 'service-worker.js',
  },
};

module.exports = process.env.NODE_ENV === 'development' ? settings : withPWA(settings);
