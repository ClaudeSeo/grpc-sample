import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { escapeRegExp } from 'lodash';
import { Model, FilterQuery } from 'mongoose';
import { Observable, map } from 'rxjs';
import { NotFoundError } from '~/common/error';
import { fromStream } from '~/common/observable';
import { GetTodoResponse, GetTodoAllRequest } from '~/idl/todo';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<TodoDocument>
  ) {}

  async getTodo(todoId: string): Promise<GetTodoResponse> {
    const todo = await this.todoModel
      .findOne({ _id: todoId })
      .select({ _id: 1, categoryId: 1, title: 1, content: 1, active: 1 })
      .lean()
      .exec();

    if (!todo) {
      throw new NotFoundError('할 일(`Todo`)이 존재하지 않습니다.');
    }

    return {
      id: todo._id.toString(),
      categoryId: todo.categoryId.toString(),
      title: todo.title,
      content: todo.content,
      active: todo.active,
    };
  }

  getAllTodoStream(payload: GetTodoAllRequest): Observable<GetTodoResponse> {
    const query: FilterQuery<TodoDocument> = {};
    if (payload.categoryId) {
      query.categoryId = payload.categoryId;
    }

    if (payload.content) {
      query.content = {
        $regex: escapeRegExp(payload.content),
      };
    }

    if (payload.title) {
      query.title = {
        $regex: escapeRegExp(payload.title),
      };
    }

    return fromStream<Todo>(this.todoModel.find(query).lean().cursor()).pipe(
      map<Todo, GetTodoResponse>(todo => ({
        id: todo._id.toString(),
        categoryId: todo.categoryId.toString(),
        title: todo.title,
        content: todo.content,
        active: todo.active,
      }))
    );
  }
}
