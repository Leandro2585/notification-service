import { InMemmoryNotificationsRepository } from '../../../test/repositories';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  test('should be able to send a notification', async () => {
    const notificationsRepository = new InMemmoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'Você tem uma nova solicitação de amizade',
      recipient_id: 'example-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
