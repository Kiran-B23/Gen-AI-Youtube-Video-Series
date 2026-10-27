import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// dev: Vite on :5173 (LAN too) and /api + /files proxied to the Fastify server on :4310 (basic auth passes through)
const api = `http://127.0.0.1:${process.env.APP_PORT ?? 4310}`;
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: true, port: 5173, proxy: { "/api": { target: api }, "/files": { target: api } } },
  build: { outDir: "dist", emptyOutDir: true },
});
