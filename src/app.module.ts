import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { exceptionFactory } from './common/error';
import configuration from './config/environment';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    TodoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          exceptionFactory,
          whitelist: true,
          transform: true,
        });
      },
    },
  ],
})
export class AppModule {}
