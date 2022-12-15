import { OnModuleInit } from '@nestjs/common'
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface'
import { PrismaClient } from '@prisma/client'

export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
