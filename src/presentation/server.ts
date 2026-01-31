import express from "express";

export class Server {

  private static app = express();

  static async run() {

    // Public resources
    this.app.use(express.static("public"));

    this.app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    })
  }
}