import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories';
import { NotificationNotFound } from '@application/errors';

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notification_id,
  }: ReadNotification.Input): Promise<ReadNotification.Output> {
    const notification = await this.notificationsRepository.findById(
      notification_id
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.read();
    await this.notificationsRepository.save(notification);
  }
}

export namespace ReadNotification {
  export type Input = {
    notification_id: string;
  };

  export type Output = void;
}
