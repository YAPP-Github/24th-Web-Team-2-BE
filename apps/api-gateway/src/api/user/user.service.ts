import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  async findUser(userId: string) {
    return await lastValueFrom(this.userClient.send({ cmd: 'find-user' }, userId));
  }

  async modifyUser(username: string, userId: string) {}

  async removeUser(user) {}
}
