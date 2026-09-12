import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // En développement local, proxifie /api vers vercel dev (port 3000)
      // Ou vers un endpoint de test. En production Vercel, ça marche nativement.
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // Si vercel dev n'est pas lancé, le frontend gère gracieusement l'erreur
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            // Silencieux en dev si le serveur API n'est pas disponible
            console.log('[Proxy] API server not available locally:', err.message);
          });
        }
      }
    }
  }
})
