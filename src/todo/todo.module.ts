import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '~/config/environment.constant';
import { TodoController } from './todo.controller';
import { Todo, TodoSchema } from './todo.schema';
import { TodoService } from './todo.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Todo.name,
          schema: TodoSchema,
        },
      ],
      DATABASE_CONNECTION_NAME.MAIN
    ),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
