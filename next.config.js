/** @type {import('next').NextConfig} */
const CopyPlugin = require('copy-webpack-plugin');
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  webpack: function (config) {
    config.experiments = { ...config.experiments };
    config.plugins = [
      ...config.plugins,
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/cloudinary-video-player/dist/cld-video-player.min.js',
            to: './static/chunks/',
          },
        ],
      }),
    ];
    return config;
  },
};

module.exports = nextConfig;
