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
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Palette } from 'src/palettes/entities/palette.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { ERRORS } from 'const';
import { PalettesService } from 'src/palettes/palettes.service';

@ApiBearerAuth()
@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
  constructor(
    private readonly colorsService: ColorsService,
    private readonly palettesService: PalettesService,
  ) {}

  @ApiOperation({
    summary: 'Создает цвет',
  })
  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @ApiOperation({
    summary: 'Возвращает все цвета',
  })
  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @ApiOperation({
    summary: 'Возвращает все цвета одной палитры',
  })
  @Get('palette/:paletteId')
  findPalleteColors(@Param('paletteId') paletteId: string) {
    return this.colorsService.findPaletteColors(+paletteId);
  }

  @ApiOperation({
    summary: 'Находит один цвет по id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorsService.findById(+id);
  }

  @ApiOperation({
    summary:
      'Изменяет цвет по id, доступно только создателю палитры, в которой цвет находится',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateColorDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const isColorOwner = await this.colorsService.checkOwner(
      user.palettes,
      +id,
    );

    const isNewPaletteOwner = updateColorDto.palette
      ? this.palettesService.checkOwner(user.palettes, +updateColorDto.palette)
      : true;

    if (!isColorOwner || !isNewPaletteOwner) {
      throw new ForbiddenException(ERRORS.NO_ACCESS);
    }
    return this.colorsService.update(+id, updateColorDto);
  }

  @ApiOperation({
    summary:
      'Удаляет цвет по id, доступно только создателю палитры, в которой цвет находится',
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    const isColorOwner = await this.colorsService.checkOwner(
      user.palettes,
      +id,
    );
    if (!isColorOwner) {
      throw new ForbiddenException(ERRORS.NO_ACCESS);
    }
    return this.colorsService.remove(+id);
  }
}
