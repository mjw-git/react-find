import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.tsx': {
        loaders: ['react-find/webpack/webpack-react-source-loader'],
      },

      '*.jsx': {
        loaders: ['react-find/webpack/webpack-react-source-loader'],
      },
    },
  },
};

export default nextConfig;
