import { ignoreElements } from 'rxjs/operators';
import { From } from './telegram-from';
import { Photo } from './telegram-photo';

export class Message {

  public message_id: number;
  public text: string;
  public date: number;
  public d: number;
  public convertDate: Date;
  public from: From;
  public edited: boolean;
  public photo: Photo;
  public caption: string;



  constructor(init?: Partial<Message>, edited?: boolean) {

    if (init) {
      this.edited = edited;
      console.log("Konstruktor Model Message========================>")
      this.message_id = init.message_id;
      this.text = init.text;
      this.d = init.date;
      this.convertDate = new Date(1000 * (init.date));
      this.from = new From(init.from);
      if (init["photo"]) {
        this.photo = init.photo;
      }

      if (init["caption"]) {
        this.caption = init.caption;
      }

    }
  }
}