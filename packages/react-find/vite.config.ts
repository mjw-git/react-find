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
    (vitePluginRequire as any).default(),
    dts({ tsconfigPath: './tsconfig.build.json' }),
  ],
  build: {
    lib: {
      name: 'test',
      formats: ['es'],
      entry: {
        index: resolve(__dirname, 'index.tsx'),
        'next/vite-plugin-react-source': resolve(__dirname, 'next/vite-plugin-react-source.ts'),
        'next/index': resolve(__dirname, 'next/index.tsx'),
      },
      fileName: (_, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: '.',
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
