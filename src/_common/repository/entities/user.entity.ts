import { prop } from '@typegoose/typegoose';
import { RoleEnum } from '@enums';

export class User {
  @prop({ required: true })
  public firstName: string;

  @prop({ required: true })
  public lastName: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: false })
  public twoFactorAuthSecret: string;

  @prop({ required: false, default: false })
  isTwoFactorEnable: boolean;

  @prop({ required: false, enum: RoleEnum, default: RoleEnum.client })
  public role: string;

  @prop({ required: false, default: true })
  public active: boolean;

  @prop({ required: false, default: null })
  public passwordResetCode: string;
}
