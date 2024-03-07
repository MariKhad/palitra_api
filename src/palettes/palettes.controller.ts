import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { PalettesService } from './palettes.service';
import { CreatePaletteDto } from './dto/create-palette.dto';
import { UpdatePaletteDto } from './dto/update-palette.dto';
import { User } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { ERRORS } from 'const';

@ApiBearerAuth()
@ApiTags('Palettes')
@Controller('palettes')
export class PalettesController {
  constructor(private readonly palettesService: PalettesService) {}

  @ApiOperation({
    summary: 'Создает палитру',
  })
  @Post()
  create(@Body() createPaletteDto: CreatePaletteDto, @Req() req: Request) {
    const user = req.user as User;
    if (user) {
      const id = user.id;
      return this.palettesService.create(createPaletteDto, id);
    }
  }

  @ApiOperation({
    summary: 'Возвращает все палитры',
  })
  @Get()
  findAll() {
    return this.palettesService.findAll();
  }

  @ApiOperation({
    summary: 'Находит одну палитру по id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.palettesService.findById(+id);
  }

  @ApiOperation({
    summary: 'Изменяет палитру по id, доступно только создателю палитры',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaletteDto: UpdatePaletteDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const isPalleteOwner = this.palettesService.checkOwner(user.palettes, +id);
    if (!isPalleteOwner) {
      throw new ForbiddenException(ERRORS.NO_ACCESS);
    }
    return this.palettesService.update(+id, updatePaletteDto);
  }

  @ApiOperation({
    summary: 'Удаляет палитру по id, доступно только создателю палитры',
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    const isPalleteOwner = this.palettesService.checkOwner(user.palettes, +id);
    if (!isPalleteOwner) {
      throw new ForbiddenException(ERRORS.NO_ACCESS);
    }
    return this.palettesService.remove(+id);
  }
}
