import { From } from './telegram-from';

export class Message {

  public message_id: number;
  public text: string;
  public date: number;
  public d: number;
  public convertDate: Date;
  public from: From;

 
  constructor(init?: Partial<Message>) {

    if (init) {
      console.log("Konstruktor Model Message========================>")
      this.message_id= init.message_id;
      this.text = init.text;
      this.d =init.date;
      this.convertDate = new Date(1000*(init.date));
      this.from = new From(init.from);
    }
  }
}