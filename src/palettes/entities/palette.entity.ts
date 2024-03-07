import { ApiProperty } from '@nestjs/swagger';
import { Color } from 'src/colors/entities/color.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Palette {
  @ApiProperty({
    description: 'Уникальный id',
    example: 1,
    required: true,
  })
  @PrimaryGeneratedColumn({ name: 'palette_id' })
  id: number;

  @ApiProperty({
    description: 'Имя палитры',
    example: 'Новая палитра',
    required: true,
  })
  @Column({ nullable: false })
  palette_name: string;

  @ApiProperty({ description: 'Создатель палитры' })
  @ManyToOne(() => User, (user) => user.palettes)
  @JoinColumn({ name: 'user_id' })
  creator: User;

  @ApiProperty({ description: 'Цвета' })
  @OneToMany(() => Color, (color) => color.palette, {
    onDelete: 'CASCADE',
  })
  colors: Color[];
}
