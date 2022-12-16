import InMemmoryNotificationsRepository from '@test/repositories';
import { CancelNotification } from '@application/usecases';
import { Content, Notification } from '@application/entities';
import { NotificationNotFound } from '@application/errors';

describe('Cancel Notification', () => {
  test('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      recipient_id: 'example-recipient-id',
      content: new Content('Nova solicitação de amizade'),
    });
    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notification_id: notification.id });

    expect(notificationsRepository.notifications[0].canceled_at).toEqual(
      expect.any(Date)
    );
  });

  test('should not be able to cancel a non existing notification ', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(async () =>
      cancelNotification.execute({
        notification_id: 'non-existing-notification-id',
      })
    ).rejects.toThrow(NotificationNotFound);
  });
});
