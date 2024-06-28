import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MailIntegratorModule } from '../src/mail-integrator.module';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

describe('MailIntegratorController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MailIntegratorModule],
    }).compile();

    const app = moduleFixture.createNestMicroservice({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3000,
      },
    });

    client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3000,
      },
    });

    await app.init();
  });

  it('pattern: helloWorld', () => {
    client.send({ cmd: 'helloWorld' }, '').subscribe((msg) => {
      expect(msg).toBe('Hello World!');
    });
  });

  afterAll(async () => {
    await app.close();
    await client.close();
  });
});
