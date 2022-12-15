import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { SendNotification } from '@application/usecases';
import { CreateNotificationDTO } from '@infra/http/dtos';
import { NotificationMapper } from '@helpers/mappers';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() dto: CreateNotificationDTO) {
    const { notification } = await this.sendNotification.execute(dto);
    return { notification: NotificationMapper.toHTTP(notification) };
  }
}
