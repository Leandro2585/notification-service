import { InMemmoryNotificationsRepository } from '@test/repositories';
import { NotificationNotFound } from '@application/errors';
import { makeNotification } from '@test/factories';
import { ReadNotification } from '@application/usecases';

describe('Read Notification', () => {
  test('should be able to read a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification({});
    await notificationsRepository.create(notification);

    await readNotification.execute({ notification_id: notification.id });

    expect(notificationsRepository.notifications[0].read_at).toEqual(
      expect.any(Date)
    );
  });

  test('should not be able to read a non existing notification ', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(async () =>
      readNotification.execute({
        notification_id: 'non-existing-notification-id',
      })
    ).rejects.toThrow(NotificationNotFound);
  });
});
