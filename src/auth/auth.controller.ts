import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from './guards';
import { LoginUserRequestDto } from './dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserRequestDto } from '../users/dto/create-user.request.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ConfirmPasswordResetDto } from './dto/confirm-password-reset.dto';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({
    summary: 'Registro de nuevo usuario',
    description: 'Permite registrar un nuevo usuario en el sistema',
  })
  @ApiBody({
    type: CreateUserRequestDto,
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserRequestDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Inicio de sesión de usuario',
  })
  @ApiBody({
    type: LoginUserRequestDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Solicitar código para restablecer contraseña',
    description: 'Genera y envía un código de verificación al correo',
  })
  @ApiBody({
    type: RequestPasswordResetDto,
  })
  @Post('request-reset-password')
  async requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
    return await this.usersService.generatePasswordResetCode(dto.email);
  }

  @ApiOperation({
    summary: 'Restablecer contraseña con código',
    description: 'Valida el código y establece la nueva contraseña',
  })
  @ApiBody({
    type: ConfirmPasswordResetDto,
  })
  @Post('reset-password')
  async resetPassword(@Body() dto: ConfirmPasswordResetDto) {
    return await this.usersService.resetPasswordWithCode(dto);
  }
}
