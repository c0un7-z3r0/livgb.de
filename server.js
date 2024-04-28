import { middleware } from "astro-imagetools/ssr";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

import express from "express";

const app = express();

const base = "/";

app.use(base, express.static("dist/client/"));

app.use(async (req, res) => {
  ssrHandler(req, res, async (err) => {
    console.log("ssrHandler ->");
    if (err) {
      res.writeHead(500);
      res.end(err.toString());
    } else {
      const buffer = await middleware(req, res);

      if (buffer) {
        res.writeHead(200);
        res.end(buffer);
      } else {
        res.writeHead(404);
        res.end();
      }
    }
  });
});

app.listen(8080);
