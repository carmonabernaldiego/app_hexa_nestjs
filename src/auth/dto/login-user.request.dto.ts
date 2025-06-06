import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserRequestDto {
  @ApiProperty({
    description: 'Correo del Usuario',
    example: 'cbdiegox@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Contraseña del Usuario',
    example: '123456ABC',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
