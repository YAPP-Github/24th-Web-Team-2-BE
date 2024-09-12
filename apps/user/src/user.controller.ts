import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create-guest-user' })
  async createGuestUser(username: string) {
    return await this.userService.createGuestUser(username);
  }

  @MessagePattern({ cmd: 'find-user' })
  async findUser(userId: string) {
    return await this.userService.findUser(userId);
  }

  @MessagePattern({ cmd: 'change-onboarding-steps' })
  async changeOnboardingSteps(data: { userId: string }) {
    const { userId } = data;
    return await this.userService.changeOnboardingSteps(userId);
  }

  @MessagePattern({ cmd: 'rollback-onboarding-steps' })
  async rollbackOnboardingSteps(userId: string) {
    return await this.userService.rollbackOnboardingSteps(userId);
  }
}
