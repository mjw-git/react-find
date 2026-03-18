/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vite';
import vitePluginRequire from 'vite-plugin-require';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      entryRoot: '.',
      tsconfigPath: './tsconfig.build.json',
      include: ['*.ts', './next/**/*.ts', './vite/**/*.ts', './webpack/**/*.ts'],
    }),
    (vitePluginRequire as any).default(),
  ],
  build: {
    lib: {
      name: 'test',
      formats: ['es', 'cjs'],
      entry: {
        index: resolve(__dirname, 'index.ts'),
        'next/index': resolve(__dirname, 'next/index.ts'),
        'vite/index': resolve(__dirname, 'vite/index.ts'),
        'webpack/index': resolve(__dirname, 'webpack/index.ts'),
      },
      fileName: (format, entryName) => {
        if (format === 'cjs') {
          return `${entryName}.cjs`;
        }
        return `${entryName}.js`;
      },
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: '.',
      },
      external: [
        /^@babel\/core/,
        /^vite/,
        /^node_modules/,
        /\.\/node_modules/,
      ],
    },
  },
});
