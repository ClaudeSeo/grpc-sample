import { Metadata, status } from '@grpc/grpc-js';
import { ValidationError } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { last } from 'lodash';

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

const exceptionChildrenFactory = (
  children: ValidationError['children']
): BaseError | null => {
  if (!children || children.length === 0) {
    return null;
  }

  const [error, ...otherErrors] = children;

  if (error.constraints) {
    return new BadRequestError(last(Object.values(error.constraints))!);
  }

  if (error.children) {
    return exceptionChildrenFactory(error.children);
  }

  return exceptionChildrenFactory(otherErrors);
};

/** class-validator 에러 메세지 추출 */
export const exceptionFactory = (errors: ValidationError[]): BaseError => {
  if (errors.length === 0) {
    return new BadRequestError('유효성 검사에 실패했습니다.');
  }

  const [error, ...otherErrors] = errors;

  if (error.constraints) {
    return new BadRequestError(last(Object.values(error.constraints))!);
  }

  if (error.children) {
    const childrenErrors = exceptionChildrenFactory(error.children);
    if (childrenErrors) {
      return childrenErrors;
    }
  }

  return exceptionFactory(otherErrors);
};
