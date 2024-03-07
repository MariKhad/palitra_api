import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { ERRORS, FIELDS } from '../../../const';

export class CreateUserDto {
  @ApiProperty({
    description: "User's name",
    example: 'Rob Stark',
  })
  @IsString({ message: `${FIELDS.USERNAME} ${ERRORS.NOT_STRING}` })
  readonly user_name: string;

  @ApiProperty({
    description: "User's login, should be unique",
    example: 'RobStark89',
  })
  @IsString({ message: `${FIELDS.LOGIN} ${ERRORS.NOT_STRING}` })
  readonly login: string;

  @ApiProperty({
    description: 'Just good difficult password from 4 to 16 characters',
  })
  @IsString({ message: `${FIELDS.PASSWORD} ${ERRORS.NOT_STRING}` })
  @Length(4, 16, { message: ERRORS.WRONG_PASS_LENGTH })
  readonly password: string;
}
