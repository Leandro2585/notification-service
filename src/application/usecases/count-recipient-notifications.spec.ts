import { InMemmoryNotificationsRepository } from '@test/repositories';
import { CountRecipientNotifications } from '@application/usecases';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count Recipient Notifications', () => {
  test('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository
    );

    await notificationsRepository.create(
      makeNotification({ recipient_id: 'recipient-1' })
    );
    await notificationsRepository.create(
      makeNotification({ recipient_id: 'recipient-1' })
    );
    await notificationsRepository.create(
      makeNotification({ recipient_id: 'recipient-2' })
    );

    const { count } = await countRecipientNotifications.execute({
      recipient_id: 'recipient-1',
    });

    expect(count).toBe(2);
  });
});
