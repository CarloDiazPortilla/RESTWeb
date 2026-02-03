import { Router } from "express";
import { TodosController } from "./todos/controller.js";

export class AppRoutes {
  static get routes() {
    const router = Router();
    const todosController = new TodosController();

    router.get("/api/todos", todosController.getTodos);

    return router;
  }
}