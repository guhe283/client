
export class From {

  public chat_id: number;
  public first_name: string;
  public is_bot: boolean;
  public language_code: string;


  constructor(init?: Partial<From>) {

    if (init) {

      this.chat_id = init.chat_id;
      this.is_bot = init.is_bot;
      this.first_name = init.first_name;
      this.language_code = init.language_code;
    }
  }
}