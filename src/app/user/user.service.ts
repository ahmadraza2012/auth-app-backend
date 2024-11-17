import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { User } from './user.schema';
import { hashedPassword, validatePassword, comparePassword } from '../../common/utils/password.utils';
import { CustomConfigService } from 'src/common/config/config.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>, private configService: CustomConfigService) {}

  async register(email: string, name: string, password: string) {
    this.logger.log('Registering a new user');

    // Validate the password
    const { isValid, errors } = validatePassword(password);

    this.logger.log(isValid, errors);
    if (!isValid) {
      throw new BadRequestException(errors.join(' '));
    }

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email is already in use.');
    }

    const hashedPwd = await hashedPassword(password);
    const user = new this.userModel({ email, name, password: hashedPwd });
    await user.save();

    this.logger.log('User registered successfully');
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    this.logger.log('Logging in user');

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password.');
    }

    const token = await this.generateJwtToken(user._id.toString());

    this.logger.log('User logged in successfully');
    return { token };
  }

  async generateJwtToken(userId: string) {
    this.logger.log('Generating JWT token');
    const token = jwt.sign({ userId: userId }, this.configService.jwtSecretKey, { expiresIn: this.configService.jwtExpiryInMinutes });
    this.logger.log('JWT token generated successfully');
    return token;
  }
}
