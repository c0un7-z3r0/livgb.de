import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { astroImageTools } from "astro-imagetools";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    icon({
      svgoOptions: {},
    }),
    astroImageTools,
  ],
  output: "server",
  prefetch: {
    prefetchAll: true,
  },
  adapter: node({
    mode: "middleware",
  }),
});
