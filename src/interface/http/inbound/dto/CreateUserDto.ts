import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'Maria da Silva',
    description: 'Nome completo do usuário',
  })
  @MaxLength(100)
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsString()
  @ApiProperty({
    example: 'maria@test.com',
    description: 'E-mail do usuário',
  })
  @MaxLength(144)
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @IsEmail()
  email: string;
}
