import type { MiddlewareHandler } from "astro";

export const onRequest1: MiddlewareHandler = async (context, next) => {
  const headers = {};
  try {
    const response = await next();

    return response;
  } catch (e) {
    // catches all unhandled errors
    return new Response("<div>Unhandled Error</div>", { headers });
  }
};
