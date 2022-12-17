import { SendNotification } from '@application/usecases';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

type SendNotificationPayload = {
  content: string;
  category: string;
  recipient_id: string;
};

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() { category, content, recipient_id }: SendNotificationPayload
  ) {
    await this.sendNotification.execute({
      content,
      category,
      recipient_id,
    });
  }
}
