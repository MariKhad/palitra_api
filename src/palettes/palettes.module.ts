import { Module } from '@nestjs/common';
import { PalettesService } from './palettes.service';
import { PalettesController } from './palettes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from 'src/colors/entities/color.entity';
import { Palette } from './entities/palette.entity';
import { ColorsModule } from 'src/colors/colors.module';
import { ColorsService } from 'src/colors/colors.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color, Palette, User]), ColorsModule],
  controllers: [PalettesController],
  providers: [PalettesService, ColorsService, UsersService],
})
export class PalettesModule {}
