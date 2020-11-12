import { from } from 'rxjs';
import { Message } from './telegram-message';
import {From } from './telegram-from';
import { Result } from './telegram-result';

export class TelegramMessage {

  public result: Result[];
  public message: Message;
  public ok: boolean;
  public from: From[];

  constructor(init?: Partial<TelegramMessage>) {

    if (init) {
      this.result = init.result.map((i) => new Result(i));
      this.message = new Message(init.message);
      //this.from = init.message.from.map((i) => new From(i));
      this.ok = init.ok;
    }
  }
}