import { Controller } from '@nestjs/common';
import {
  UserServiceControllerMethods,
  UserServiceController,
  FindByIdRequest,
} from '~/idl/user';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor() {}

  findById(payload: FindByIdRequest) {
    console.log(payload);
    return {
      name: 'GRPC',
    };
  }
}
