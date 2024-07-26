import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
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
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
