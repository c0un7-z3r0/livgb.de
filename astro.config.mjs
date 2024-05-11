import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { astroImageTools } from "astro-imagetools";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import partytown from "@astrojs/partytown";
import playformCompress from "@playform/compress";

import playformInline from "@playform/inline";

// https://astro.build/config
export default defineConfig({
  site: "https://livgb.de",
  integrations: [tailwind(), icon({
    svgoOptions: {}
  }), astroImageTools, robotsTxt({
    sitemap: false
  }), playformCompress(), playformInline()],
  output: "server",
  prefetch: {
    prefetchAll: true
  },
  adapter: node({
    mode: "middleware"
  })
});