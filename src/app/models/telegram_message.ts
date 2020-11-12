export class TelegramMessage {

  public result: any[];

  constructor(init?: Partial<TelegramMessage>) {

    if (init) {
      this.result = init.result;
      console.log("Konstruktor=======================================>", this.result)
      console.log("Konstruktor=======================================>", this.result)
    
    }
  }
}