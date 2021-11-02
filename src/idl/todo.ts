/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';

export const protobufPackage = 'grpc_sample';

export interface GetTodoRequest {
  todoId: string;
}

export interface GetTodoResponse {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  active: boolean;
}

export interface GetTodoAllRequest {
  categoryId?: string | undefined;
  title?: string | undefined;
  content?: string | undefined;
}

export const GRPC_SAMPLE_PACKAGE_NAME = 'grpc_sample';

export interface TodoServiceClient {
  getTodo(request: GetTodoRequest): Observable<GetTodoResponse>;

  getTodoAll(request: GetTodoAllRequest): Observable<GetTodoResponse>;
}

export interface TodoServiceController {
  getTodo(
    request: GetTodoRequest
  ): Promise<GetTodoResponse> | Observable<GetTodoResponse> | GetTodoResponse;

  getTodoAll(request: GetTodoAllRequest): Observable<GetTodoResponse>;
}

export function TodoServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getTodo', 'getTodoAll'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('TodoService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('TodoService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const TODO_SERVICE_NAME = 'TodoService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
