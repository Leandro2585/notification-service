import { IsNotEmpty } from 'class-validator';
import { IsUUID } from 'class-validator/types/decorator/decorators';

export class CreateNotificationDTO {
  @IsNotEmpty()
  @IsUUID()
  recipient_id: string;
  content: string;
  category: string;
}
