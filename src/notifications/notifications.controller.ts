import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsProducerService } from './notifications-producer.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsProducerService: NotificationsProducerService,
  ) {}

  @Post()
  async sendNotification(@Body() data: any) {
    try {
      return await this.notificationsProducerService.sendNotification(data);
    } catch (error) {
      return {
        message: 'Error al enviar la notificación',
        error: error.message,
      };
    }
  }
}
