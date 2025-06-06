import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'Nombre del Usuario',
    example: 'Fernando',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Apellidos del Usuario',
    example: 'Rivera Constantino',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Correo del Usuario',
    example: 'correo@ejemplo.test',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Contraseña del Usuario',
    example: '123456ABC',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Rol del Usuario',
    example: 'client | admin',
  })
  @IsOptional()
  @IsString()
  @IsIn(['client', 'admin'], {
    message: 'El rol debe ser cliente o administrador',
  })
  @IsNotEmpty()
  role?: string;

  @ApiProperty({
    description: 'Estado del Usuario',
    example: 'true | false',
  })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  active?: boolean;

  @ApiProperty({
    description: 'Estado del Usuario',
    example: 'true | false',
  })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isTwoFactorEnable?: boolean;
}
