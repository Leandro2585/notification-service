import { Notification } from '@application/entities';
import { NotificationsRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    input: GetRecipientNotifications.Input
  ): Promise<GetRecipientNotifications.Output> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(
        input.recipient_id
      );
    return { notifications };
  }
}

export namespace GetRecipientNotifications {
  export type Input = {
    recipient_id: string;
  };

  export type Output = {
    notifications: Notification[];
  };
}
