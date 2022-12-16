import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories';
import { NotificationNotFound } from '@application/errors';

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notification_id,
  }: UnreadNotification.Input): Promise<UnreadNotification.Output> {
    const notification = await this.notificationsRepository.findById(
      notification_id
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.unread();
    await this.notificationsRepository.save(notification);
  }
}

export namespace UnreadNotification {
  export type Input = {
    notification_id: string;
  };

  export type Output = void;
}
