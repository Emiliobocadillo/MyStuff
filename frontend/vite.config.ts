import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // You can change the port number if needed
  },
  resolve: {
    alias: {
      "@": "/src", // This allows you to use @ as a shortcut to the src directory
    },
  },
});
