import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  test('should be able to send a notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'Você tem uma nova solicitação de amizade',
      recipient_id: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
