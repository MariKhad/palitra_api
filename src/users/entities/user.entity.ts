import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Palette } from 'src/palettes/entities/palette.entity';

@Entity()
export class User {
  @ApiProperty({
    description: 'Уникальный id',
    example: 1,
    required: true,
  })
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @ApiProperty({
    description: 'Имя юзера для регистрации',
    example: 'Rob Stark',
    required: true,
  })
  @Column({ unique: true, nullable: false })
  user_name: string;

  @ApiProperty({
    description: 'логин юзера',
    example: 'RobStark89',
    required: true,
  })
  @Column({ unique: true, nullable: false })
  login: string;

  @ApiProperty({ description: 'Просто достаточно сложный пароль' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({ description: 'Создатель палитры' })
  @OneToMany(() => Palette, (palette) => palette.creator, {
    onDelete: 'CASCADE',
  })
  palettes: Palette[];
}
