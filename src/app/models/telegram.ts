import { from } from 'rxjs';
import { Message } from './telegram-message';
import {From } from './telegram-from';
import { Result } from './telegram-result';
import { Photo } from './telegram-photo';
import { EditedMessage } from './telegram-edited-message';

export class TelegramMessage {

  public result: Result[];
  public message: Message;
  public edited_message: EditedMessage;
  public photo: Photo;
  public ok: boolean;
  public from: From[];
  public file: File;

  constructor(init?: Partial<TelegramMessage>) {

    if (init) {
      console.log("Konstruktor Model telegram========================>", init)
      this.result = init.result.map((i) => new Result(i));
      //this.edited_message = new EditedMessage(init.edited_message);
      //this.message = new Message(init.message);
      //this.edited_message = new Message(init.edited_message);
      //this.from = init.message.from.map((i) => new From(i));
      //this.photo = new Photo(init.photo);
      this.ok = init.ok;
    }
  }
}