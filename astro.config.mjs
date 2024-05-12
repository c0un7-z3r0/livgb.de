import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { astroImageTools } from "astro-imagetools";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import playformInline from "@playform/inline";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "https://livgb.de",
  integrations: [
    tailwind(),
    icon({
      svgoOptions: {},
    }),
    astroImageTools,
    robotsTxt({
      sitemap: false,
    }),
    playformInline(),
    playformCompress(),
  ],
  output: "server",
  prefetch: {
    prefetchAll: true,
  },
  adapter: node({
    mode: "middleware",
  }),
});

