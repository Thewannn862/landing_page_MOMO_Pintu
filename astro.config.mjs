// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],

    server: {
      host: true,
      allowedHosts: [
        'rangers-bradley-lenders-negotiation.trycloudflare.com',
      ],
    },
  },

  integrations: [react()],
});
