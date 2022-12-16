import { InMemmoryNotificationsRepository } from '@test/repositories';
import { NotificationNotFound } from '@application/errors';
import { makeNotification } from '@test/factories';
import { ReadNotification } from '@application/usecases';

describe('Unread Notification', () => {
  test('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification({
      read_at: new Date(),
    });
    await notificationsRepository.create(notification);

    await readNotification.execute({ notification_id: notification.id });

    expect(notificationsRepository.notifications[0].read_at).toBeNull();
  });

  test('should not be able to unread a non existing notification ', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(async () =>
      readNotification.execute({
        notification_id: 'non-existing-notification-id',
      })
    ).rejects.toThrow(NotificationNotFound);
  });
});
