import {
  IsNotEmpty,
  IsEmail,
  IsAlpha,
  Length,
  IsNumberString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email deve ser válido' })
  email: string;

  @IsNotEmpty({ message: 'Matrícula é obrigatória' })
  @IsNumberString({}, { message: 'Matrícula deve conter apenas números' })
  registration: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @Length(6, 6, { message: 'Senha deve ter exatamente 6 caracteres' })
  password: string;
}
