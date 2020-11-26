import { File } from './telegram-file';
import { Photo } from './telegram-photo';
import { EditedMessage } from './telegram-edited-message';
import { From } from './telegram-from';
import { Message } from './telegram-message';

export class Result {

  public update_id: number;
  public message: Message;
  public photo: Photo;
  public path_image: File;
  //public edited_message: EditedMessage;
  //public from: From;


  constructor(init?: Partial<Result>) {

    if (init) {
      console.log("Konstruktor Model Result========================>");
      this.update_id = init.update_id;
      this.path_image = init.path_image;
      if (init["message"]) {
        this.message = new Message(init["message"], false);
      } else if (init["edited_message"]) {
        this.message = new Message(init["edited_message"], true);
      }
      //this.from = new From(init.from);
    }

  }
}