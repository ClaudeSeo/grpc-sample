import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  TodoServiceController,
  TodoServiceControllerMethods,
} from '~/idl/todo';
import { GetTodoAllRequest } from './dto/todo-get-all.dto';
import { GetTodoRequest } from './dto/todo-get.dto';
import { TodoService } from './todo.service';

@Controller()
@TodoServiceControllerMethods()
export class TodoController implements TodoServiceController {
  constructor(private readonly todoService: TodoService) {}

  getTodo(@Payload() payload: GetTodoRequest) {
    return this.todoService.getTodo(payload.todoId);
  }

  getTodoAll(@Payload() payload: GetTodoAllRequest) {
    return this.todoService.getAllTodoStream(payload);
  }
}
