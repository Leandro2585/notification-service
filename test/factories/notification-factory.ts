import {
  Content,
  Notification,
  NotificationParams,
} from '@application/entities';

type Override = Partial<NotificationParams>;

export const makeNotification = (override: Override) => {
  return new Notification({
    category: 'social',
    recipient_id: 'example-recipient-id',
    content: new Content('Nova solicitação de amizade'),
    ...override,
  });
};
