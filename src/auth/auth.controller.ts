import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../decorators/public.decorator';

@ApiTags('Autorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Зарегистрированные пользователи получат токен после логина',
  })
  @ApiResponse({
    status: 200,
    description: 'Зарегистрированные пользователи получат токен после логина',
  })
  @Public()
  @Post('/login')
  login(@Body() authDto: CreateAuthDto) {
    return this.authService.login(authDto);
  }

  @ApiOperation({
    summary: 'Регистрация нового пользователя и получение токена',
  })
  @Public()
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
