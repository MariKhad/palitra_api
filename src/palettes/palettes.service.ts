import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaletteDto } from './dto/create-palette.dto';
import { UpdatePaletteDto } from './dto/update-palette.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Palette } from './entities/palette.entity';

@Injectable()
export class PalettesService {
  constructor(
    @InjectRepository(Palette)
    private paletteRepository: Repository<Palette>,
  ) {}

  async create(createPaletteDto: CreatePaletteDto, creatorId: number) {
    const palette = this.paletteRepository.create({
      ...createPaletteDto,
      creator: { id: creatorId },
    });
    return this.paletteRepository.save(palette);
  }

  async findAll(): Promise<Palette[]> {
    return this.paletteRepository
      .createQueryBuilder('palette')
      .leftJoinAndSelect('palette.colors', 'colors')
      .leftJoinAndSelect('palette.creator', 'creator')
      .select([
        'palette.id',
        'palette.palette_name',
        'colors',
        'creator.user_name',
      ])
      .getMany();
  }

  async findById(id: number): Promise<Palette> {
    const palette = await this.paletteRepository
      .createQueryBuilder('palette')
      .leftJoinAndSelect('palette.colors', 'colors')
      .leftJoin('palette.creator', 'creator')
      .addSelect('creator.user_name')
      .where('palette.id = :id', { id })
      .getOne();
    if (!palette) {
      throw new NotFoundException();
    }
    return palette;
  }

  async update(
    id: number,
    updatePaletteDto: UpdatePaletteDto,
  ): Promise<UpdateResult> {
    return await this.paletteRepository.update(id, updatePaletteDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.paletteRepository.delete(id);
  }

  checkOwner(palettes: Palette[], paletteId: number): boolean {
    return palettes.some((palette) => palette.id === paletteId);
  }
}
