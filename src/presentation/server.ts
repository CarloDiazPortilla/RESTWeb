import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { envs } from "../config/plugins/envs.js";

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

  static async run() {

    // Public resources
    this.app.use(express.static(this.PUBLIC_PATH));

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