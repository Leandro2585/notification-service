export class Content {
  private readonly content: string;

  constructor(content: string) {
    const contentLenghtIsValid = this.validateContentLength(content);
    if (!contentLenghtIsValid) {
      throw new Error('Content length error.');
    }
    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
