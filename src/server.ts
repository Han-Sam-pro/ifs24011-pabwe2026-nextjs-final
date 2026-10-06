import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { APP_PORT } from "./lib/config";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = APP_PORT;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url || "", true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Terjadi error pada penanganan request:", req.url, err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  })
    .once("error", (err: Error) => {
      console.error("Gagal menjalankan server:", err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(
        `> Server berjalan pada http://${hostname}:${port} [ENV: ${
          process.env.NODE_ENV || "development"
        }]`
      );
    });
});