import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { astroImageTools } from "astro-imagetools";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    icon({
      svgoOptions: {},
    }),
    astroImageTools,
    robotsTxt({
      sitemap: false,
    }),
  ],
  output: "server",
  prefetch: {
    prefetchAll: true,
  },
  adapter: node({
    mode: "middleware",
  }),
});
