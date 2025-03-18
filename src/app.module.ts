import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './modules/order/order.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FilterExceptionGlobal } from './resources/filters/filter-exception-global';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { GlobalLoggerInterceptor } from './resources/interceptors/global-logger/global-logger.interceptor';

@Module({
  imports: [
    UserModule,
    ProductModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore(
          {
            socket: {
              host: '127.0.0.1',
              port: 6379,
            },
            ttl: 10 * 1000,
          },
        ),
      }),
      isGlobal: true,
    }),
    AuthenticationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilterExceptionGlobal,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggerInterceptor,
    },
    ConsoleLogger,
  ],
})
export class AppModule {}
