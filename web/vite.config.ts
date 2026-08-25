import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/k1": {
        changeOrigin: true,
        target: "http://localhost:4000",
      },
      "/api/k2": {
        changeOrigin: true,
        target: "http://localhost:4000",
      },
      "/api/k3": {
        changeOrigin: true,
        target: "http://localhost:4000",
      },
      "/api/yle-word-bank": {
        changeOrigin: true,
        target: "http://localhost:4321",
      },
      // Dev: served from public/; production via reverse proxy
      // "/curriculum-resources": {
      //   changeOrigin: true,
      //   target: "http://localhost:4321",
      // },
      "/api": {
        changeOrigin: true,
        target: "http://localhost:4000",
      },
    },
  },
});
