import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CustomConfigModule } from 'src/common/config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User schema
    CustomConfigModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export if needed in other modules
})
export class UserModule {}