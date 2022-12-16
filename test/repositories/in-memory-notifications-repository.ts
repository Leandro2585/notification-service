import { Notification } from '@application/entities';
import { NotificationsRepository } from '@application/repositories';

export class InMemmoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findById(notification_id: string): Promise<Notification> {
    const notification = this.notifications.find(
      (item) => item.id === notification_id
    );
    if (!notification) {
      return null;
    }
    return notification;
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id
    );
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countManyByRecipientId(recipient_id: string): Promise<number> {
    const count = await this.notifications.filter(
      (item) => item.recipient_id === recipient_id
    ).length;
    return count;
  }
}
