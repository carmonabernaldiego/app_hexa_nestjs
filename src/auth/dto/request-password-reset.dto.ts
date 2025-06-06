import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestPasswordResetDto {
  @ApiProperty({
    description: 'Correo del Usuario',
    example: 'correo@ejemplo.test',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
