import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['more-jawfish-8745-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'bW9yZS1qYXdmaXNoLTg3NDUk5uxEgqmDmmBDFh6a0eX2uu0qbLTnIjzX7QlyTkY',
          password:
            'zEJM-K-u2PmRgrD0fIMI6qSwYYCriFYwQvwms3E1fUFW3IIWXv00ovzZ4ZOKv9Sohnlieg==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
