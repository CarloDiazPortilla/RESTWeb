import express, { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { envs } from "../config/plugins/envs.js";
import { AppRoutes } from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ServerOptions {
  port: number,
  publicPath: string,
}

export class Server {

  private static app = express();

  private static readonly PORT: number = envs.PORT;
  private static readonly PUBLIC_PATH: string = envs.PUBLIC_PATH;
  private static routes: Router = AppRoutes.routes;

  static async run() {

    // Middleware
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded

    // Public resources
    this.app.use(express.static(this.PUBLIC_PATH));

    // Routes
    this.app.use(this.routes);

    this.app.get("/{*splat}", (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.PUBLIC_PATH}/index.html`);
      res.sendFile(indexPath);
      return;
    })

    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`);
    })
  }
}