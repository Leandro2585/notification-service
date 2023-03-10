import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/replace';
import { Content } from './content';

export type NotificationParams = {
  recipient_id: string;
  content: Content;
  category: string;
  read_at?: Date | null;
  canceled_at?: Date | null;
  created_at: Date;
};

export class Notification {
  private _id: string;
  private params: NotificationParams;

  constructor(
    params: Replace<NotificationParams, { created_at?: Date }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.params = {
      ...params,
      created_at: params.created_at ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set content(content: Content) {
    this.params.content = content;
  }

  public get content(): Content {
    return this.params.content;
  }

  public set recipient_id(recipient_id: string) {
    this.params.recipient_id = recipient_id;
  }

  public get recipient_id(): string {
    return this.params.recipient_id;
  }

  public set category(category: string) {
    this.params.category = category;
  }

  public get category(): string {
    return this.params.category;
  }

  public read() {
    this.params.read_at = new Date();
  }

  public unread() {
    this.params.read_at = null;
  }

  public get read_at() {
    return this.params.read_at;
  }

  public cancel() {
    this.params.canceled_at = new Date();
  }

  public get canceled_at(): Date | null | undefined {
    return this.params.canceled_at;
  }

  public get created_at(): Date {
    return this.params.created_at;
  }
}
