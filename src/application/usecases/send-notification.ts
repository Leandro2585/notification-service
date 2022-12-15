import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories';

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    input: SendNotification.Input
  ): Promise<SendNotification.Output> {
    const { category, content, recipient_id } = input;
    const notification = new Notification({
      recipient_id,
      content: new Content(content),
      category,
    });
    await this.notificationsRepository.create(notification);
    return { notification };
  }
}

export namespace SendNotification {
  export type Input = {
    recipient_id: string;
    content: string;
    category: string;
  };

  export type Output = {
    notification: Notification;
  };
}
