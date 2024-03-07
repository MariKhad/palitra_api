import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsString } from 'class-validator';
import { ERRORS, FIELDS } from '../../../const';

export class CreateColorDto {
  @ApiProperty({
    description: 'Hex of the color',
    example: '#FFFFAA',
  })
  @IsString({ message: `${FIELDS.HEX} ${ERRORS.NOT_STRING}` })
  @IsHexColor({ message: `${FIELDS.HEX} ${ERRORS.NOT_HEX}` })
  readonly hex: string;

  @ApiProperty({
    description: 'Id of the palette',
    example: '1',
  })
  readonly palette: string;
}
