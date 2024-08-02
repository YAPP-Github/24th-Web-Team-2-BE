import { Body, Controller, Delete, Get, Patch, Query, Res, Session } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUser(@Session() session, @Res() res: Response) {
    const user = session.user;

    const findData = await this.userService.findUser(user);

    return res.send(user);
  }

  @Patch()
  async modifyUser(@Body('username') username: string, @Session() session, @Res() res: Response) {
    const user = session.user;

    const modifyData = await this.userService.modifyUser(user);

    return res.status(204).send('사용자 이름 변경 완료');
  }

  @Delete()
  async removeUser(@Session() session, @Res() res: Response) {
    const user = session.user;

    const removeData = await this.userService.removeUser(user);

    return res.status(204).send('사용자 정보 삭제 완료');
  }
}
