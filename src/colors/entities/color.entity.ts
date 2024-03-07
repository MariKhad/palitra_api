import { ApiProperty } from '@nestjs/swagger';
import { Palette } from '../../palettes/entities/palette.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Color {
  @ApiProperty({
    description: 'Уникальный id',
    example: 1,
    required: true,
  })
  @PrimaryGeneratedColumn({ name: 'color_id' })
  id: number;

  @ApiProperty({
    description: 'Имя цвета',
    example: 'Milan',
  })
  @Column({ nullable: false })
  color_name: string;

  @ApiProperty({
    description: 'HEX код цвета',
    example: '000000',
  })
  @Column({ nullable: false })
  hex: string;

  @ApiProperty({ description: 'Палитра, в которой цвет находится' })
  @ManyToOne(() => Palette, (palette) => palette.colors)
  @JoinColumn({ name: 'pallete_id' })
  palette: Palette;
}
