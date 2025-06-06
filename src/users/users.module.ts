import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoryModule } from '@repository/repository.module';

import { NotificationsModule } from '@src/notifications/notifications.module';

@Module({
  imports: [RepositoryModule, NotificationsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
