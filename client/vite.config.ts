import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://server:8081",
    },
  },
  preview: {
    proxy: {
      "/api": "http://server:8081",
    },
  },
});
