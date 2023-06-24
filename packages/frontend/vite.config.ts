import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
    }),
    eslint(),
    viteTsconfigPaths(),
  ],
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
});
