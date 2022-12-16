import { InMemmoryNotificationsRepository } from '@test/repositories';
import { CountRecipientNotifications } from '@application/usecases';
import { Content, Notification } from '@application/entities';

describe('Count Recipient Notifications', () => {
  test('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository
    );

    const notification = new Notification({
      category: 'social',
      recipient_id: 'example-recipient-id',
      content: new Content('Nova solicitação de amizade'),
    });
    const notification2 = new Notification({
      category: 'social',
      recipient_id: 'example-recipient-id',
      content: new Content('Nova solicitação de amizade'),
    });
    const notification3 = new Notification({
      category: 'social',
      recipient_id: 'other-example-recipient-id',
      content: new Content('Nova solicitação de amizade'),
    });
    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification3);

    const { count } = await countRecipientNotifications.execute({
      recipient_id: 'example-recipient-id',
    });

    expect(count).toBe(2);
  });
});
