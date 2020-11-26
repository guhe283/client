import { Result } from 'src/app/models/telegram-result';
import { APP_INITIALIZER } from '@angular/core';


export class File extends Result{

  public file_id: string;
  public file_unique_id: string;
  public file_path: string;
  public file_size: number;

  constructor(init?) {
    super(init)

    if (init) {
console.log("============================Konstruktor File init =================================================================", init)
console.log("============================Konstruktor File init file_path =================================================================", init.result.file_path);
      this.file_id = init.result.file_id;
      this.file_unique_id = init.result.file_unique_id;
      this.file_size = init.result.file_size;
      this.file_path=  init.result.file_path;
      //this.path_image = new File(init.file);
      this.path_image= init.result.file_path;
    }

  }
}

/*

{
   "ok":true,
   "result":{
      "file_id":"AgACAgQAAxkBAANCX7vVDLJ2Vq9NAe908c7X1xk07ToAAq20MRtqQeFRK3Woy7hxnmRCvQUpXQADAQADAgADbQADcgMBAAEeBA",
      "file_unique_id":"AQADQr0FKV0AA3IDAQAB",
      "file_size":20335,
      "file_path":"photos/file_4.jpg"
   }
}

*/