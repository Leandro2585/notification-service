import { Module } from '@nestjs/common';
import {
  CancelNotification,
  CountRecipientNotifications,
  GetRecipientNotifications,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@application/usecases';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    ReadNotification,
    UnreadNotification,
    CancelNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
  ],
})
export class HttpModule {}
