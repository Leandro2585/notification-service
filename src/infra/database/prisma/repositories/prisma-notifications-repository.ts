import { Notification } from '@application/entities';
import { NotificationsRepository } from '@application/repositories';
import { NotificationMapper } from '@helpers/mappers';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notification_id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notification_id,
      },
    });
    if (!notification) {
      return null;
    }

    return NotificationMapper.toDomain(notification);
  }

  async countManyByRecipientId(recipient_id: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipient_id,
      },
    });
    return count;
  }

  async findManyByRecipientId(recipient_id: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipient_id },
    });
    return notifications.map(NotificationMapper.toDomain);
  }

  async save(notification: Notification): Promise<void> {
    const raw = NotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = NotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({
      data: raw,
    });
  }
}
