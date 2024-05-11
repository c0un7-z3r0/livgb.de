const express = require("express");
const winston = require("winston");

const app = express();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/server.log",
    }),
  ],
});

const base = "/";

app.use(base, express.static("dist/client/"));

app.use(async (req, res) => {
  (await import("./dist/server/entry.mjs")).handler(req, res, async (err) => {
    logger.info({ url: req.url });
    if (err) {
      logger.error({ err });
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
