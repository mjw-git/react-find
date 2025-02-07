/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginRequire from 'vite-plugin-require';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      // babel: {
      //   plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
      // },
    }),
    dts({
      entryRoot: '.',
      tsconfigPath: './tsconfig.build.json',
      include: ['index.tsx', './next/**/**.ts', './next/**/**.tsx',"./vite/**/**.ts","./vite/**/**.tsx","./webpack/**/**.ts","./webpack/**/**.tsx"],
    }),
    (vitePluginRequire as any).default(),
  ],
  build: {
    lib: {
      name: 'test',
      formats: ['es','cjs'],
      entry: {
        index: resolve(__dirname, 'index.tsx'),
        'next/index': resolve(__dirname, 'next/index.ts'),
        'vite/index': resolve(__dirname, 'vite/index.ts'),
        'webpack/index': resolve(__dirname, 'webpack/index.ts'),
      },
      fileName: (format, entryName) => {
        if(format==='cjs'){
          return `${entryName}.cjs`;
        }
        return `${entryName}.js`},
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: '.',
        banner: (chunk) => {
          // 为特定文件添加 "use client" 指令
          if (chunk.fileName.includes('FindContainer')||chunk.fileName.includes('SelectModal')) {
            return '"use client";\n';
          }
          return '';
        },
        globals: {
          react: 'React',
          reactDom: 'react-dom',
        },
      },
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        /^@babel\/core/,
        /^vite/,
        /^node_modules/,
        /\.\/node_modules/,
      ],
    },
  },
});
