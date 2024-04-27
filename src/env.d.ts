/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STRAPI_URL: string;
  readonly STRAPI_KEY: string;
}
