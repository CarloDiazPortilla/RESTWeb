import type { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/todos";
import type { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodosController {

  constructor(
    private readonly todoRepository: TodoRepository
  ) {
  }

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  }

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todoId = Number(id);

    try {
      const todo = await this.todoRepository.findById(todoId);
      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error })
    }

  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({
      message: error,
    });

    const newTodo = await this.todoRepository.create(createTodoDto!);
    return res.json(newTodo);
  }

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateTodoId = Number(id);
    if (isNaN(updateTodoId)) return res.status(400).json({
      message: "ID argument must be a number"
    })
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id: updateTodoId });

    if (error) return res.status(404).json({
      message: error
    })

    try {
      const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
      return res.json(updatedTodo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteTodoId = Number(id);
    if (isNaN(deleteTodoId)) return res.status(400).json({
      message: "ID argument must be a number"
    })

    try {
      const deletedTodo = await this.todoRepository.deleteById(deleteTodoId);
      return res.json(deletedTodo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}