import { Notification } from '@application/entities';
import { NotificationsRepository } from '@application/repositories';

export class InMemmoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
