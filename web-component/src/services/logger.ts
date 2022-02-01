class LoggerService {
  constructor() {}

  private _debug: boolean = false;

  public set debug(value: boolean) {
    this._debug = value;
  }

  log(message1, message2: any = '') {
    if (this._debug) {
      console.log(message1, message2);
    }
  }
}
export const LoggerServiceInstance = new LoggerService();
