import { File } from './telegram-file';
import { from } from 'rxjs';
import { Message } from './telegram-message';
import {From } from './telegram-from';
import { Result } from './telegram-result';
import { Photo } from './telegram-photo';
import { EditedMessage } from './telegram-edited-message';
import { TelegramMessage } from './telegram';

export class TelegramAll extends Result{

  public result1: Result;
  public message: Message;
  public edited_message: EditedMessage;
  public photo: Photo;
  public ok: boolean;
  public file1: File;

  constructor(init?) {
    super(init)

    if (init) {
      console.log("Konstruktor Model telegramAll========================>", init)
     
     // this.result = init.result.map((i) => new Result(i));
      //this.path_image = new File(init.file);
      //this.path_image = new File(init.init.result.file_path);
      //this.from = new From(init.from);
      //this.edited_message = new EditedMessage(init.edited_message);
      //this.message = new Message(init.message);
      //this.edited_message = new Message(init.edited_message);
      //this.from = init.message.from.map((i) => new From(i));
      //this.photo = new Photo(init.photo);
      
      //console.log("Konstruktor Model telegramAll result========================>",this.result)
      
      console.log("Konstruktor Model telegramAll===================file=====>",init.result.file_path)
      //this.ok = init.ok;
    }
  }
}