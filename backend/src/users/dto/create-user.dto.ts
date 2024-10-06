import { IsNotEmpty, IsEmail, Length, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'Ana Silva' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'ana.silva@example.com',
  })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email deve ser válido' })
  email: string;

  @ApiProperty({
    description: 'Número de matrícula do usuário',
    example: '123456',
  })
  @IsNotEmpty({ message: 'Matrícula é obrigatória' })
  @IsNumberString({}, { message: 'Matrícula deve conter apenas números' })
  registration: string;

  @ApiProperty({
    description: 'Senha do usuário (deve ser alfanumérica)',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @Length(6, 6, { message: 'Senha deve ter exatamente 6 caracteres' })
  password: string;
}
