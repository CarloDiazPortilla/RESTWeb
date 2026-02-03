import { Router } from "express";
import { TodosController } from "./controller.js";

export class TodosRoutes {
  static get routes() {
    const router = Router();
    const todosController = new TodosController();

    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodoById);

    return router;
  }
}