import type { Request, Response } from "express"

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: new Date() },
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

    if (!todo) return res.status(404).json({
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
      completedAt: new Date(),
      text,
    };
    todos.push(newTodo);
    return res.json(newTodo);
  }

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const updateTodoId = Number(id);

    if (isNaN(updateTodoId)) return res.status(400).json({
      message: "ID argument must be a number"
    })

    const updatedTodo = todos.find(todo => {
      return todo.id === updateTodoId;
    })

    if (!updatedTodo) return res.status(404).json({
      message: `Couldn't find the todo with id: ${id}`,
    })

    const { text, completedAt } = req.body;

    updatedTodo.text = text || updatedTodo.text;

    (completedAt === "null") ?
      updatedTodo.completedAt = null :
      updatedTodo.completedAt = new Date(completedAt || updatedTodo.completedAt);

    return res.json(updatedTodo);
  }

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteTodoId = Number(id);

    if (isNaN(deleteTodoId)) return res.status(400).json({
      message: "ID argument must be a number"
    })

    const deletedTodo = todos.find(todo => todo.id === deleteTodoId);

    if (!deletedTodo) return res.status(404).json({
      message: `Todo with id ${deleteTodoId} not found`
    })

    todos.splice(todos.indexOf(deletedTodo), 1);

    return res.json({
      ...deletedTodo
    })
  }
}