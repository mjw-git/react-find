/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 添加类型声明以解决模块声明文件缺失问题
import { vitePluginReactSource } from 'react-find/next';
// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [vitePluginReactSource(), react()],
});
