import { ValidaUserResponseCodes } from '@enums';

export interface RsAuthServiceValidaUserRequest {
  Clave: string;
  DV: string;
  operacion: string;
  canal: string;
}

export interface RsAuthServiceValidaUserResponse {
  validaUserResponse: {
    salida: {
      codigo: ValidaUserResponseCodes;
      descripcion: string;
      tipoAutenticacion: string;
    };
  };
}
