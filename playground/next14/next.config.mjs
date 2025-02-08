/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // 修改现有的 babel-loader 配置
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'react-find/webpack/webpack-react-source-loader'
        }
      ]
    });

    return config;
  }
};

export default nextConfig;
