import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { authenticator } from 'otplib';
import { Response } from 'express';
import { toFileStream } from 'qrcode';

import { UsersService } from '@src/users/users.service';
import { AuthService } from './auth.service';
import { User } from '@entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateTwoFactorAuthSecret(user: any) {
    const userDB = await this.usersService.findById(user.userId!);
    if (userDB.isTwoFactorEnable)
      return { ok: false, msg: 'Already QR generated' };

    const secret = authenticator.generateSecret();
    const otpAuthUrl = authenticator.keyuri(
      user.email,
      process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
      secret,
    );
    await this.usersService.setTwoFactorAuthenticationSecret(
      secret,
      user.userId!,
    );

    // Emitir el evento para el código de confirmación
    this.client.emit('send_notification', {
      type: 'confirmation_code',
      email: user.email,
      code: secret,
    });

    return {
      secret,
      otpAuthUrl,
    };
  }

  async qrCodeStreamPipe(stream: Response, otpPathUrl: string) {
    return toFileStream(stream, otpPathUrl);
  }

  async verifyTwoFaCode(twoFactorCode: string, user: any) {
    const { userId } = user;
    const userDB = await this.usersService.findById(userId);

    return authenticator.verify({
      token: twoFactorCode,
      secret: userDB.twoFactorAuthSecret,
    });
  }

  async activationOfTwoFactorAuth(id: string) {
    await this.usersService.turnOnTwoFactorAuthentication(id);
  }

  async login(user: any, isTwoFactorAuthenticated: boolean): Promise<any> {
    const { userId, email } = user;
    const userDB = await this.usersService.findById(userId);

    const payload = {
      isTwoFactorAuthenticated,
      isTwoFactorEnable: user.isTwoFactorEnable,
      username: email,
      sub: userId,
    };
    userDB.password = '********';
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      userDB,
    };
  }
}
