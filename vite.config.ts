import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: '', // ← para URLs limpias y Vercel. No pongas './'

    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, '.'),
      },
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          prices: resolve(__dirname, 'prices.html'),
          client: resolve(__dirname, 'client.html'),
          register: resolve(__dirname, 'register.html'),
          imprint: resolve(__dirname, 'imprint.html'),
          privacy: resolve(__dirname, 'privacy.html'),
          contact: resolve(__dirname, 'contact.html'),
        }
      }
    },

    server: {
      fs: {
        allow: ['.']
      }
    }
  };
});
