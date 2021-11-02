import { Metadata, status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

class BaseError extends RpcException {
  constructor(
    status: status,
    message: string,
    public readonly metadata?: Metadata
  ) {
    super({
      metadata,
      message,
      code: status,
    });

    this.name = this.constructor.name;
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string, public readonly metadata?: Metadata) {
    super(status.INVALID_ARGUMENT, message, metadata);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string, public readonly metadata?: Metadata) {
    super(status.UNAUTHENTICATED, message);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string, public readonly metadata?: Metadata) {
    super(status.PERMISSION_DENIED, message);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string, public readonly metadata?: Metadata) {
    super(status.NOT_FOUND, message);
  }
}

/** 에러에서 message, stack까지 꺼내줌 */
export const errorToJson = (err: Error) => ({
  ...err,
  message: err.message,
  stack: err.stack,
});
