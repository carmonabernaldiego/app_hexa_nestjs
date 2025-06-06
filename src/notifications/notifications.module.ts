import { Module } from '@nestjs/common';
import { NotificationsProducerService } from './notifications-producer.service';
import { NotificationsController } from './notifications.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATIONS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: 'notifications_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsProducerService],
  exports: [
    NotificationsProducerService,
    ClientsModule, // Export the ClientsModule instance
  ],
})
export class NotificationsModule {}
