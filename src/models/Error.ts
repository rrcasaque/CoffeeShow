export class Error {
  constructor(
    private errorCode: number,
    private message: string
  ) {
    this.errorCode = errorCode;
    this.message = message;
  }
  getErrorCode(): number {
    return this.errorCode;
  }
  getMessage(): string {
    return this.message;
  }
}
