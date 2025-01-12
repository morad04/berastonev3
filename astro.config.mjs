import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['@rainbow-me/rainbowkit', 'wagmi', 'viem', '@wagmi/core']
    },
    optimizeDeps: {
      include: ['@rainbow-me/rainbowkit', 'wagmi', 'viem', '@wagmi/core']
    },
    build: {
      rollupOptions: {
        external: ['@wagmi/connectors'],
        output: {
          manualChunks: {
            'wagmi': ['wagmi', '@wagmi/core'],
            'rainbow': ['@rainbow-me/rainbowkit'],
            'viem': ['viem']
          }
        }
      }
    }
  }
});