export class Message {

  public message_id: number;
  public text: string;
  public date: number;
  public d: number;
  public convertDate: Date;

 
  constructor(init?: Partial<Message>) {

    if (init) {
      console.log("Konstruktor Model Message========================>");
      this.message_id= init.message_id;
      this.text = init.text;
      console.log("Konstruktor Model Message date========================>",  init.date);
     
      this.d =init.date;

      this.convertDate = new Date(1000*(init.date));
      console.log("Konstruktor Model Message message_is========================>",this.message_id);
      console.log("Konstruktor Model Message text========================>",  this.text);
      console.log("Konstruktor Model Message date========================>",  this.date);
    }
  }
}