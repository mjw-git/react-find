/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginRequire from 'vite-plugin-require';
import dts from 'vite-plugin-dts';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    (vitePluginRequire as any).default(),
    dts({ tsconfigPath: './tsconfig.build.json' }),
  ],
  build: {
    lib: {
      name: 'test',
      entry: 'index.tsx',
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          reactDom: 'react-dom',
        },
      },
      external: ['react', 'react-dom'],
    },
  },
});
