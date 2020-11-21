
export class From {

  public id: number;
  public first_name: string;
  public is_bot: boolean;
  public language_code: string;
  public edited: boolean;


  constructor(init?: Partial<From>, edited?: boolean) {

    if (init) {
      //this.edited = edited;
      this.id = init.id;
      this.is_bot = init.is_bot;
      this.first_name = init.first_name;
      this.language_code = init.language_code;
    }
  }
}