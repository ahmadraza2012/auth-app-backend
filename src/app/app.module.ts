import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CustomConfigService } from 'src/common/config/config.service';
import { generateMongooseUri } from 'src/common/utils/default.utls';
import { CustomConfigModule } from 'src/common/config/config.module';
import { MongooseConnectionService } from 'src/common/connectors/mongoose-connection.service';
import helmet from 'helmet';
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: (configService: CustomConfigService): ThrottlerModuleOptions => ([
        {
          ttl: Number(configService.throttleTTL), // Time-to-live (milliseconds)
          limit: Number(configService.throttleLimit), // Max requests allowed in the ttl period
        }
      ]),
      inject: [CustomConfigService],
    }),
    CustomConfigModule,
    MongooseModule.forRootAsync({
      imports: [CustomConfigModule], 
      useFactory: (configService: CustomConfigService) => ({
        uri: generateMongooseUri(configService),
      }),
      inject: [CustomConfigService],
    }),
    UserModule,
  ],
  providers: [MongooseConnectionService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes('*');
  }
}