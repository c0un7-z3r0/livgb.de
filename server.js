const express = require("express");
const helmet = require("helmet");

const app = express();

const base = "/";
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "https://*.livgb.de", "data:"],
        "script-src": ["'self'", "'unsafe-inline'"],
        "script-src-attr": ["'unsafe-hashes'", "'unsafe-inline'"],
      },
    },
  }),
);

app.use(base, express.static("dist/client/"));

app.use(async (req, res) => {
  (await import("./dist/server/entry.mjs")).handler(req, res, async (err) => {
    console.log("ssrHandler ->");
    if (err) {
      res.writeHead(500);
      res.end(err.toString());
    } else {
      const buffer = await (
        await import("astro-imagetools/ssr")
      ).middleware(req, res);

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

app.listen(process.env.PORT);
