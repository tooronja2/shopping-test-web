import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// La siguiente importación ha sido comentada para evitar errores en producción.
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  },
  plugins: [
    react(),
    // La siguiente línea fue desactivada para eliminar el resaltado amarillo de desarrollo.
    // mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          security: ['dompurify', 'crypto-js', 'zod']
        }
      }
    }
  }
}));
