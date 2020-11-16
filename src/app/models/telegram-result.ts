import { EditedMessage } from './telegram-edited-message copy';
import { From } from './telegram-from';
import { Message } from './telegram-message';

export class Result {

  public update_id: number;
  public message: Message;
  public edited_message: EditedMessage;
  public from: From;


  constructor(init?: Partial<Result>) {

    if (init) {
      console.log("Konstruktor Model Result========================>");
      this.update_id = init.update_id;
      this.message = new Message(init.message);
      this.edited_message = new EditedMessage(init.edited_message);


      //this.from = new From(init.from);
    }
  }
}
