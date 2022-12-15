import { Notification } from 'src/application/entities';
import { NotificationsRepository } from 'src/application/repositories';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create({
    content,
    category,
    created_at,
    id,
    read_at,
    recipient_id,
  }: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id,
        content: content.value,
        category,
        created_at,
        read_at,
        recipient_id,
      },
    });
  }
}
