import { defineConfig } from "vite";
import { resolve } from "node:path";

const htmlInputs = {
  main: resolve(__dirname, "index.html"),
  browse: resolve(__dirname, "browse.html"),
  detail: resolve(__dirname, "comic-detail.html"),
  cart: resolve(__dirname, "cart.html"),
};

export default defineConfig({export default defineConfig({
  base: '/comic_verse/',   // REQUIRED FOR GITHUB PAGES
  root: ".",
  server: {
    port: 4173,
    open: "/index.html",
  },
  preview: {
    port: 4173,
    open: "/index.html",
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: htmlInputs,
    },
  },
});

  
