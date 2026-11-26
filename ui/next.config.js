const p = require('./package.json');

const environment = process.env.NODE_ENV || 'dev';
const version = p.version;

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    disableStaticImages: true,
  },
  poweredByHeader: true,
  productionBrowserSourceMaps: process.env.BROWSER_SOURCE_MAPS === 'true',
  publicRuntimeConfig: {
    environment,
    endpoint: process.env.ENDPOINT || '/graphql',
    spa: !!process.env.SPA || false,
    mainBackground: process.env.MAIN_BACKGROUND || '#059669',
  },
  serverRuntimeConfig: {
    endpoint: process.env.SERVER_ENDPOINT || process.env.ENDPOINT || '/graphql',
  },
  env: {
    version,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  transpilePackages: ['styled-components'],
};