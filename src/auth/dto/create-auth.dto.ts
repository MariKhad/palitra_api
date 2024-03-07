import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    description: "User's login, should be unique",
    example: 'RobStark89',
  })
  readonly login: string;
  @ApiProperty({ description: 'Just good dificult password' })
  readonly password: string;
}
