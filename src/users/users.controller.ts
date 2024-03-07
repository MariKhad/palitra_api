import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание нового пользователя' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Показать всех пользователей' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Найти пользователя по id' })
  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @ApiOperation({ summary: 'Удалить пользователя по его id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: 'Изменить информацию о пользователе по его id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateUserDto) {
    return this.usersService.update(+id, updateArticleDto);
  }
}
