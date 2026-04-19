import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api/products": { target: "http://localhost:7081", changeOrigin: true },
      "/api/cart": { target: "http://localhost:7082", changeOrigin: true },
    },
  },
});
