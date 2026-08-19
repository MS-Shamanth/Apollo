import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    assetsInlineLimit: 2048,
  },
  preview: {
    // Vite blocks requests with an unknown Host header. A leading dot matches
    // subdomains, so this permits Cloudflare quick-tunnel hostnames only —
    // deliberately narrower than `true`, which would accept any host.
    allowedHosts: [".trycloudflare.com"],
  },
});
