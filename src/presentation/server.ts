import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Server {

  private static app = express();

  static async run() {

    // Public resources
    this.app.use(express.static("public"));

    this.app.get("/{*splat}", (req, res) => {
      const indexPath = path.join(__dirname + "../../../public/index.html");
      res.sendFile(indexPath);
      return;
    })

    this.app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    })
  }
}