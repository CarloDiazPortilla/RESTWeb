import type { Request, Response } from "express"
import { prisma } from "../../database/postgresdb/init";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";

export class TodosController {

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  }

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = Number(id);
    if (isNaN(todoId)) return res.status(400).json({
      message: "ID argument must be a number"
    })

    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId
      }
    })

    if (!todo) return res.status(404).json({
      message: `Couldn't find the todo with id: ${id}`,
    })
    return res.json(todo);
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({
      message: error,
    });

    const newTodo = await prisma.todo.create({
      data: createTodoDto!
    })

    return res.json(newTodo);
  }

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateTodoId = Number(id);

    if (isNaN(updateTodoId)) return res.status(400).json({
      message: "ID argument must be a number"
    })

    const { text, completedAt } = req.body;

    const todo = await prisma.todo.findUnique({
      where: {
        id: updateTodoId
      }
    })

    if (!todo) return res.status(404).json({
      message: `Couldn't find the todo with id: ${id}`,
    })

    const updatedTodo = await prisma.todo.update({
      data: {
        text,
        completedAt: (!completedAt) ? todo.completedAt : new Date(completedAt)
      },
      where: {
        id: updateTodoId
      }
    })

    return res.json(updatedTodo);
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteTodoId = Number(id);

    if (isNaN(deleteTodoId)) return res.status(400).json({
      message: "ID argument must be a number"
    })

    const todo = await prisma.todo.findFirst({
      where: {
        id: deleteTodoId
      }
    })

    if (!todo) return res.status(404).json({
      message: `Todo with id ${deleteTodoId} not found`
    })

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: deleteTodoId
      }
    })

    return res.json(deletedTodo);
  }
}