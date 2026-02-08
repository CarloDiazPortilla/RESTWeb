import type { TodoDatasource } from "../../domain/datasources/todo.datasource";
import type { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/todos";
import type { TodoEntity } from "../../domain/entities/todo.entity";
import type { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodoRepositoryImpl implements TodoRepository {

  constructor(
    private readonly datasource: TodoDatasource
  ) { }

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }

}