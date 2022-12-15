import { Module } from '@nestjs/common';
import { SendNotification } from '@application/usecases';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}