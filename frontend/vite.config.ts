import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '');
  const isProd = mode === 'production';
  return {
    plugins: [react(), tailwindcss()],
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : [],
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      cssMinify: 'esbuild',
      minify: 'terser',
      sourcemap: false,
      reportCompressedSize: false,
      cssCodeSplit: false,
      target: 'es2020',
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.warn', 'console.error'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
      } : undefined,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/react-') || id.includes('node_modules/motion')) {
              return 'vendor';
            }
            if (id.includes('node_modules/react-router')) {
              return 'router';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            if (id.includes('src/content/blogArticles')) {
              return 'blog-data';
            }
            if (id.includes('src/data/products')) {
              return 'product-data';
            }
            if (id.includes('src/lib/affiliateRegistry')) {
              return 'affiliate';
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
