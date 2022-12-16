import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories';

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipient_id,
  }: CountRecipientNotifications.Input): Promise<CountRecipientNotifications.Output> {
    const count = await this.notificationsRepository.countManyByRecipientId(
      recipient_id
    );
    return { count };
  }
}

export namespace CountRecipientNotifications {
  export type Input = {
    recipient_id: string;
  };

  export type Output = { count: number };
}
