import {
  CacheStore,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { UserRepository } from '@repository/user.repository';
import { User } from '@entities';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';
import { ConfirmPasswordResetDto } from '../auth/dto/confirm-password-reset.dto';
import { hashPassword } from '@helpers';

@Injectable()
export class UsersService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserRequestDto) {
    createUserDto.email = createUserDto.email.toLocaleLowerCase();
    createUserDto.password = await hashPassword(createUserDto.password);
    return await this.userRepository.create({
      ...createUserDto,
      isTwoFactorEnable: false,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserRequestDto) {
    let user = await this.findById(id);
    const {
      active = undefined,
      role = undefined,
      ...updateRest
    } = updateUserDto;

    if (updateRest.password) {
      updateRest.password = await hashPassword(updateRest.password);
    }

    user = { ...user, ...updateRest };
    return await this.userRepository.save(id, user);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      email: email.toLocaleLowerCase(),
    });

    return user; // Aquí el usuario tendrá el campo _id automáticamente.
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: string) {
    const user = await this.findById(userId);
    await this.userRepository.save(userId, { twoFactorAuthSecret: secret });
  }

  async turnOnTwoFactorAuthentication(userId: string) {
    const user = await this.findById(userId);
    await this.userRepository.save(userId, { isTwoFactorEnable: true });
  }

  async generatePasswordResetCode(email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Generar código aleatorio de 6 caracteres
    const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Actualizar usuario directamente por correo
    await this.userRepository.updateByEmail(email, {
      passwordResetCode: resetCode,
      twoFactorAuthSecret: null,
      isTwoFactorEnable: false,
    });

    // Emitir el evento para el código de reestablecimiento
    this.client.emit('send_notification', {
      type: 'password_reset',
      email: email.toLowerCase(),
      code: resetCode,
    });

    return {
      message: 'Si el correo existe, recibirás un código de verificación',
    };
  }

  async resetPasswordWithCode(dto: ConfirmPasswordResetDto) {
    const user = await this.findByEmail(dto.email);
    if (!user || user.passwordResetCode !== dto.code) {
      throw new UnauthorizedException('Código o correo inválido');
    }

    // Actualizar contraseña y limpiar código
    const hashedPassword = await hashPassword(dto.newPassword);
    await this.userRepository.updateByEmail(dto.email, {
      password: hashedPassword,
      passwordResetCode: null,
    });

    return { message: 'Contraseña actualizada exitosamente' };
  }
}
