import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auths } from './entity/auth.entity';

describe('auth service', () => {
  let authService: AuthService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService,
        {
          provide: 'AuthsRepository',
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('to be defined', async () => {
    expect(AuthService).toBeDefined();
  });

  describe('Auth 정보 저장', () => {
    test('첫 번째 가입 시, 성공적으로 저장됨', () => {});

    test('이미 가입된 정보가 존재하면 저장에 실패함', () => {});
  });
});
