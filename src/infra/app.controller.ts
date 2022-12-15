import { Controller, Get } from '@nestjs/common'
import { Body, Post } from '@nestjs/common/decorators'
import { randomUUID } from 'crypto'
import { CreateNotificationDTO } from './create-notification-dto'
import { PrismaService } from './prisma.service'

@Controller('notification')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(): Promise<any> {
    return await this.prisma.notification.findMany()
  }

  @Post()
  async create(@Body() dto: CreateNotificationDTO) {
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        ...dto,
      },
    })
  }
}
