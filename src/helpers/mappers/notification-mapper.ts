import { Content, Notification } from '@application/entities';
import { notification as RawNotification } from '@prisma/client';
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

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        recipient_id: raw.recipient_id,
        category: raw.category,
        content: new Content(raw.content),
        read_at: raw.read_at,
        canceled_at: raw.canceled_at,
        created_at: raw.created_at,
      },
      raw.id
    );
  }
}
