import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ERRORS, FIELDS } from 'const';

export class CreatePaletteDto {
  @ApiProperty({
    description: "Palette's name",
    example: 'Rob Stark',
  })
  @IsString({ message: `${FIELDS.PALETTENAME} ${ERRORS.NOT_STRING}` })
  readonly palette_name: string;
}
