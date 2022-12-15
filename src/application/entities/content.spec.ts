import { Content } from './content';

describe('Notification Content', () => {
  test('should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  test('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('ABCD')).toThrow();
  });

  test('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('A'.repeat(241))).toThrow();
  });
});
