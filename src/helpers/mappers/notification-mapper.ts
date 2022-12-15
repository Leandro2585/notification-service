import { Notification } from '@application/entities';

export class NotificationMapper {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipient_id: notification.recipient_id,
    };
  }

  static toPrisma({
    id,
    category,
    content,
    created_at,
    read_at,
    recipient_id,
  }: Notification) {
    return {
      id,
      content: content.value,
      category,
      created_at,
      read_at,
      recipient_id,
    };
  }
}
