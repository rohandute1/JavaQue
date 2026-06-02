import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Minify + mangle variable names — makes source code unreadable
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,    // Remove all console.log in production
        drop_debugger: true,   // Remove all debugger statements
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
      },
      mangle: {
        toplevel: true,        // Mangle top-level variable names
      },
      format: {
        comments: false,       // Strip all comments from output
      },
    },
    // Split chunks so no single file is too large
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
        // Obfuscate chunk filenames with hashes
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
      },
    },
    // Generate source maps only for internal debugging — DO NOT upload to server
    sourcemap: false,
    // Warn if any chunk > 500KB
    chunkSizeWarningLimit: 500,
  },
})
