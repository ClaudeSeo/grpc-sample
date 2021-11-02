import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['user'],
    protoPath: [join(__dirname, '../idl/user.proto')],
  },
};
