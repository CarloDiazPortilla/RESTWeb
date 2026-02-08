import type { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/todos";
import type { TodoRepository } from "../../domain/repositories/todo.repository";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "../../domain/use-cases";

export class TodosController {

  constructor(
    private readonly todoRepository: TodoRepository
  ) {
  }

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then(todos => res.json(todos))
      .catch(error => res.status(400).json({ error }))
  }

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = Number(id);

    new GetTodo(this.todoRepository)
      .execute(todoId)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json(error))

  }

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({
      message: error,
    });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }));
  }

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const updateTodoId = Number(id);
    if (isNaN(updateTodoId)) return res.status(400).json({
      message: "ID argument must be a number"
    })
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id: updateTodoId });

    if (error) return res.status(404).json({
      message: error
    })

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }));
  }

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteTodoId = Number(id);
    if (isNaN(deleteTodoId)) return res.status(400).json({
      message: "ID argument must be a number"
    })

    new DeleteTodo(this.todoRepository)
      .execute(deleteTodoId)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }))
  }
}