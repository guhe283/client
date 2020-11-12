import { Message } from './message';

export class Result {

  public update_id: number;
  public message: Message;


  constructor(init?: Partial<Result>) {

    if (init) {
      console.log("Konstruktor Model Result========================>")
      this.update_id = init.update_id;
      this.message = new Message(init.message);
    }
  }
}
