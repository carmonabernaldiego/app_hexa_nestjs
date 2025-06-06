import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConfirmPasswordResetDto {
  @ApiProperty({
    description: 'Correo del Usuario',
    example: 'correo@ejemplo.test',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Código de verificación',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Nueva contraseña',
    example: '123456ABC',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
