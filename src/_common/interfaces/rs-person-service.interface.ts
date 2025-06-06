export interface RsPersonServiceTraerDatosBasicosRequest {
  codigoCliente: string;
  userId: string;
}

export interface RsPersonServiceTraerDatosBasicosResponse {
  usuario: string;
  primerNombre: string;
  segundoNombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  estadoCivil: string;
  correoElectronico: string;
  numeroCliente: string;
  genero: string;
  telefono: number;
  nivelEducacional: string;
  error?: any;
}
