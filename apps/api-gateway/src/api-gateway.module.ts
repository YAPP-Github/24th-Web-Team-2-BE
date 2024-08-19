import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { InboxModule } from './api/inbox/inbox.module';
<<<<<<< HEAD
import { AutomationModule } from './api/publish-automation/automation.module';
import { HttpLoggerMiddleware } from './common/middlewares/logging.middleware';
=======
import { APP_FILTER } from '@nestjs/core';
import { AllGlobalExceptionsFilter } from './common/exceptions/global-exception.filter';
>>>>>>> 2177a73 (feat: custom exception filter 적용)

@Module({
  imports: [
    AuthModule,
    UserModule,
    InboxModule,
    AutomationModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
    {
      provide: APP_FILTER,
      useClass: AllGlobalExceptionsFilter,
    },
  ],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
