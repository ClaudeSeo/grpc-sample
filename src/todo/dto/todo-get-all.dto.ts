import { IsOptional, IsString, IsMongoId } from 'class-validator';
import { GetTodoAllRequest as _GetTodoAllRequest } from '~/idl/todo';

export class GetTodoAllRequest implements _GetTodoAllRequest {
  @IsOptional()
  @IsMongoId()
  categoryId: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;
}
