import { Controller } from '@nestjs/common';
import { Body, Post, Patch, Get, Param } from '@nestjs/common/decorators';
import {
  CancelNotification,
  CountRecipientNotifications,
  GetRecipientNotifications,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@application/usecases';
import { CreateNotificationDTO } from '@infra/http/dtos';
import { NotificationMapper } from '@helpers/mappers';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private cancelNotification: CancelNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications
  ) {}

  @Post()
  async create(@Body() dto: CreateNotificationDTO) {
    const { notification } = await this.sendNotification.execute(dto);
    return { notification: NotificationMapper.toHTTP(notification) };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<CancelNotification.Output> {
    await this.cancelNotification.execute({ notification_id: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<ReadNotification.Output> {
    await this.readNotification.execute({ notification_id: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<UnreadNotification.Output> {
    await this.unreadNotification.execute({ notification_id: id });
  }

  @Get('count/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string
  ): Promise<CountRecipientNotifications.Output> {
    return await this.countRecipientNotifications.execute({
      recipient_id: recipientId,
    });
  }

  @Get(':recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipient_id: recipientId,
    });
    return { notifications: notifications.map(NotificationMapper.toHTTP) };
  }
}
