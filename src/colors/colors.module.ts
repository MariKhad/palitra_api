import { Module, forwardRef } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { PalettesModule } from 'src/palettes/palettes.module';
import { Palette } from 'src/palettes/entities/palette.entity';
import { Color } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PalettesService } from 'src/palettes/palettes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Color, Palette]),
    forwardRef(() => PalettesModule),
  ],
  controllers: [ColorsController],
  providers: [ColorsService, PalettesService],
})
export class ColorsModule {}
