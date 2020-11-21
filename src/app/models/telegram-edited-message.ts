import { From } from './telegram-from';

export class EditedMessage {

  public message_id: number;
  public text: string;
  public date: number;
  public d: number;
  public convertDate: Date;
  public from: From;


  constructor(init?: Partial<EditedMessage>) {

    if (init) {

      this.message_id = init.message_id;
      this.text = init.text;
      this.d = init.date;
      this.convertDate = new Date(1000 * (init.date));
      this.from = new From(init.from);
    }

  }
}