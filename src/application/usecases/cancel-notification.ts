import { Injectable } from '@nestjs/common';
import { Content, Notification } from '@application/entities';
import { NotificationsRepository } from '@application/repositories';
import { NotificationNotFound } from '@application/errors';

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    input: CancelNotification.Input
  ): Promise<CancelNotification.Output> {
    const { notification_id } = input;
    const notification = await this.notificationsRepository.findById(
      notification_id
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.cancel();
    await this.notificationsRepository.save(notification);
  }
}

export namespace CancelNotification {
  export type Input = {
    notification_id: string;
  };

  export type Output = void;
}
