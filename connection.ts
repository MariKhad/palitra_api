import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const createTypeOrmOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => { console.log(configService.get<string>('POSTGRES_PASSWORD'));
 return ({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD')?.toString(),
  database: configService.get<string>('POSTGRES_DB'),
  entities: [__dirname + '/**/*.entity{.js, .ts}'],
  synchronize:
    process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
  logging: false,
  //process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
})
};
