import { IsMongoId } from 'class-validator';
import { GetTodoRequest as _GetTodoRequest } from '~/idl/todo';

export class GetTodoRequest implements _GetTodoRequest {
  @IsMongoId()
  todoId: string;
}
