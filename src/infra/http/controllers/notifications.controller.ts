import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { SendNotification } from 'src/application/usecases';
import { CreateNotificationDTO } from '../dtos/create-notification-dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() dto: CreateNotificationDTO) {
    const { notification } = await this.sendNotification.execute(dto);
    return { notification };
  }
}
