import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createGuestUser(username: string) {
    const guestUserInfo: User = this.userRepository.create({
      username: username,
      onboardingStep: 'guest',
    });

    return await this.userRepository.save(guestUserInfo);
  }

  async findUser(userId: string) {
    const userInfo: User = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return userInfo;
  }

  async changeOnboardingSteps(userId: string) {
    await this.userRepository.update({ id: userId }, { onboardingStep: 'completed' });
    return true;
  }

  async rollbackOnboardingSteps(userId: string) {
    await this.userRepository.update({ id: userId }, { onboardingStep: 'guest' });
    return true;
  }
}
