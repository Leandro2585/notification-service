import { SendNotification } from '@application/usecases';
import { DatabaseModule } from '@infra/database/database.module';
import { NotificationsController } from '@infra/messaging/kafka/controllers';
import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [NotificationsController],
})
export class MessagingModule {}
