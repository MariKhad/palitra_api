import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';
import { PalettesService } from 'src/palettes/palettes.service';
import { ERRORS, FIELDS, URL } from '../../const';
import axios from 'axios';
import { UsersService } from 'src/users/users.service';
import { Palette } from 'src/palettes/entities/palette.entity';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    private readonly paletteService: PalettesService,
  ) {}

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const { hex, palette: paletteId } = createColorDto;
    const color_name = await this.fetchColorName(hex);
    const palette = this.paletteService.findById(+paletteId);
    if (!palette) {
      throw new NotFoundException(`${FIELDS.PALETTE} ${ERRORS.NOT_FOUND}`);
    }
    const color = this.colorRepository.create({
      color_name,
      hex: createColorDto.hex.toUpperCase(),
      palette: { id: +createColorDto.palette },
    });
    return this.colorRepository.save(color);
  }

  async findAll(): Promise<Color[]> {
    return this.colorRepository.find({ relations: ['palette'] });
  }

  async findPaletteColors(paletteId: number): Promise<Color[]> {
    return this.colorRepository
      .createQueryBuilder('color')
      .innerJoinAndSelect('color.palette', 'palette')
      .where('palette.id = :paletteId', { paletteId })
      .getMany();
  }

  async findById(id: number): Promise<Color> {
    const color = await this.colorRepository.findOne({
      where: { id: id },
      relations: ['palette'],
    });
    if (!color) {
      throw new NotFoundException();
    }
    return color;
  }

  async update(
    id: number,
    updateColorDto: UpdateColorDto,
  ): Promise<UpdateResult | undefined> {
    const { hex, palette: paletteId } = updateColorDto;
    let colorInfo = {};
    let paletteInfo = {};
    if (hex) {
      const color_name = await this.fetchColorName(hex);
      colorInfo = {
        color_name,
        hex: hex.toUpperCase(),
      };
    }
    if (paletteId) {
      paletteInfo = {
        palette: { id: paletteId },
      };
    }
    return await this.colorRepository.update(id, {
      ...colorInfo,
      ...paletteInfo,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.colorRepository.delete(id);
  }

  async fetchColorName(hex: string): Promise<string> {
    try {
      const response = await axios.get(`${URL}id?hex=${hex}`);
      if (response.status === 404) {
        throw new NotFoundException(`${FIELDS.COLORNAME} ${ERRORS.NOT_FOUND}`);
      }
      return response.data.name.value;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async checkOwner(palettes: Palette[], colorId: number) {
    const color = await this.findById(colorId);
    return this.paletteService.checkOwner(palettes, color.palette.id);
  }
}
