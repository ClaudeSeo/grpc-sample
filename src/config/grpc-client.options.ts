import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'grpc_sample',
    protoPath: [join(__dirname, '../idl/todo.proto')],
  },
};
