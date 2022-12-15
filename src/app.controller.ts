import { Controller, Get } from '@nestjs/common'
import { Post } from '@nestjs/common/decorators'
import { randomUUID } from 'crypto'
import { PrismaService } from './prisma.service'

@Controller('notification')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(): Promise<any> {
    return await this.prisma.notification.findMany()
  }

  @Post()
  async create() {
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content: 'Você tem uma nova solicitação de amizade',
        category: 'social',
        recipient_id: randomUUID(),
      },
    })
  }
}
