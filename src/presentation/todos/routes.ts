import { Router } from "express";
import { TodosController } from "./controller.js";
import { TodoDatasourceImpl } from "../../infrastructure/datasources/todo.datasource.impl.js";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl.js";

export class TodosRoutes {
  static get routes() {
    const router = Router();

    const datasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource);

    const todosController = new TodosController(todoRepository);

    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodoById);
    router.post("/", todosController.createTodo);
    router.put("/:id", todosController.updateTodo);
    router.delete("/:id", todosController.deleteTodo);

    return router;
  }
}