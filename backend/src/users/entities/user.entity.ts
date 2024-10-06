import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único gerado automaticamente', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nome do usuário', example: 'Ana Silva' })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Número de matrícula do usuário',
    example: '123456',
  })
  registration: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Email do usuário (único)',
    example: 'ana.silva@example.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    description: 'Senha criptografada do usuário',
    example: 'hashed_password_123',
  })
  password: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2024-10-05T10:00:00Z',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2024-10-06T10:00:00Z',
  })
  updatedAt: Date;
}
