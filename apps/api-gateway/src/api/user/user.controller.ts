import { Body, Controller, Delete, Get, Patch, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { AuthInfo } from '../../common/decorators/auth-info.decorator';
import { IAuthInfo } from '../../common/interfaces/auth.interface';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUser(@AuthInfo() authInfo: IAuthInfo, @Res() res: Response) {
    const { userId } = authInfo;
    const userInfo = await this.userService.findUser(userId);

    return res.send(userInfo);
  }

  @Patch()
  async modifyUser(@Body('username') username: string, @AuthInfo() authInfo: IAuthInfo, @Res() res: Response) {
    const { userId } = authInfo;

    const modifyData = await this.userService.modifyUser(username, userId);

    return res.status(204).send({
      message: '사용자 이름 변경 완료',
      data: modifyData,
    });
  }

  @Delete()
  async removeUser(@AuthInfo() authInfo: IAuthInfo, @Res() res: Response) {
    const { userId } = authInfo;

    const removeData = await this.userService.removeUser(userId);

    return res.status(204).send({
      message: '사용자 정보 삭제 완료',
      data: removeData,
    });
  }
}
