import { From } from './telegram-from';
import { Message } from './telegram-message';

export class Result {

  public update_id: number;
  public message: Message;
  public from: From;


  constructor(init?: Partial<Result>) {

    if (init) {
      console.log("Konstruktor Model Result========================>")
      this.update_id = init.update_id;
      this.message = new Message(init.message);
      //this.from = init.from.map((i) => new From(i));
     this.from = new From(init.from);
    }
  }
}
