import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationsProducerService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendNotification(data: any) {
    return this.client.emit('send_notification', data); // 'send_notification' es el nombre del evento
  }
}
