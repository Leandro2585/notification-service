import { Notification } from '@application/entities';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemmoryNotificationsRepository } from '@test/repositories';
import { GetRecipientNotifications } from './get-recipient-notification';

describe('Get Recipient Notifications', () => {
  test('should be able to return recipient notifications', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipient_id: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipient_id: 'recipient-1' }),
        expect.objectContaining({ recipient_id: 'recipient-1' }),
      ])
    );
  });
});
