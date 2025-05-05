import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/news": {
        target: "http://localhost:8080", // 백엔드 주소
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
