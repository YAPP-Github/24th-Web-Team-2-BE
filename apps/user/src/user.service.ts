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
  async createGuestUser(username) {
    const guestUserInfo: User = this.userRepository.create({
      username: username,
      onboardingStep: 'create-guest-id',
    });

    return await this.userRepository.save(guestUserInfo);
  }
}
