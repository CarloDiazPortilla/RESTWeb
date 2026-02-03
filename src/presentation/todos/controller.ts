import type { Request, Response } from "express"

const todos = [
  { id: 1, text: "Buy milk", createdAt: new Date() },
  { id: 2, text: "Buy bread", createdAt: null },
  { id: 3, text: "Buy butter", createdAt: new Date() },
]

export class TodosController {

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  }

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = Number(id);
    if (isNaN(todoId)) return res.status(400).json({
      message: "ID argument must be a number"
    })

    const todo = todos.find(todo => {
      return todo.id === todoId;
    })

    if (!todo) res.status(404).json({
      message: `Couldn't find the todo with id: ${id}`,
    })
    return res.json(todo);
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({
      message: "Text property is required",
    });
    const newTodo = {
      id: todos.length + 1,
      createdAt: new Date(),
      text,
    };
    todos.push(newTodo);
    return res.json(newTodo);
  }
}