import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutos - 288 peticiones en 24 horas, en estos casos se podria configurar algo para bloquear este tipo de ips considerando de donde provengan las peticiones, en este caso este servicio se encarga de la gestion de usuarios
  max: 20, // Limite de 20 peticiones por IP
  message:
    'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.',
});

@Module({})
export class RateLimiterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(limiter).forRoutes('*'); // Aplica el rate limiter a todas las rutas
  }
}
