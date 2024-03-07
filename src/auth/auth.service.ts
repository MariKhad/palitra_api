import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ERRORS } from '../../const';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async login(authDto: CreateAuthDto) {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(ERRORS.USER_EXISTS, HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { login: user.login };
    const secret = this.configService.get('JWT_SECRET');
    return {
      token: this.jwtService.sign(payload, { secret }),
    };
  }

  private async validateUser(authDto: CreateAuthDto) {
    const user = (await this.userService.getUserByLogin(authDto.login)) as User;
    if (!user) {
      throw new NotFoundException();
    }
    const passwordEquals = await bcrypt.compare(
      authDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    } else {
      throw new UnauthorizedException({
        message: ERRORS.VALIDATION_FAIL,
      });
    }
  }
}
