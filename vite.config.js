import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.js',
      refresh: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'facephi-sdk-provider': ['@facephi/sdk-web-wc/loader'],
          'facephi-selphi-widget': ['@facephi/selphi-widget-web'],
          'facephi-selphid-widget': ['@facephi/selphid-widget-web'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Ajusta el límite según tus necesidades
  },
});
