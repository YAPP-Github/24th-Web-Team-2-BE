import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
// import Redis from 'ioredis';
// import RedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  // const redisClient = new Redis({
  //   host: process.env.REDIS_HOST,
  //   port: parseInt(process.env.REDIS_PORT),
  //   password: process.env.REDIS_PASSWORD,
  // });

  // const redisStore = new RedisStore({
  //   client: redisClient,
  // });

  app.use(
    session({
      // store: redisStore,
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      },
    }),
  );
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      // forbidNonWhitelisted: true,
      // transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
