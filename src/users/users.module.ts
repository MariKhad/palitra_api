import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PalettesModule } from 'src/palettes/palettes.module';
import { ColorsModule } from 'src/colors/colors.module';
import { Color } from 'src/colors/entities/color.entity';
import { Palette } from 'src/palettes/entities/palette.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService, ConfigService],
  imports: [
    TypeOrmModule.forFeature([User, Palette]),
    PalettesModule,
    ColorsModule,
    forwardRef(() => AuthModule),
    ConfigModule.forRoot(),
  ],
  exports: [UsersService],
})
export class UsersModule {}
