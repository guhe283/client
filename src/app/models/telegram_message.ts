import { Message } from './message';
import { Result } from './result';

export class TelegramMessage {

  public result: Result[];
  public message: Message;
  public ok: boolean;

  constructor(init?: Partial<TelegramMessage>) {

    if (init) {
      this.result = init.result.map((i) => new Result(i));
      this.message = new Message(init.message);
      this.ok = init.ok;
      console.log("Konstruktor Message=======================================>", this.result)
  
    }
  }
}