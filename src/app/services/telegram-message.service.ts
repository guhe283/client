import { Injectable } from '@angular/core';;
import { HttpClient } from '@angular/common/http';
import { TelegramMessage } from '../models/telegram_message';
import { Key } from 'protractor';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TelegramMessageService {

  message: TelegramMessage[];
  message1: Object;

  configUrl: string = 'https://api.lemon.markets/rest/v1/data/instruments/';
  updateUrl: string = 'https://api.telegram.org/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/getUpdates'
  constructor(private http: HttpClient) {
  }


  getUpdate() {
    console.log("getUpdate===>");
    return this.http.get<TelegramMessage>(this.updateUrl).pipe(map(res => {
      console.log("====================res======", res)
      const postArray = [];
      const postArray1 = [];
      for (const key in res) {
        postArray.push(res[key]);
      }
      console.log("====================PostArray======", postArray)
      console.log("====================PostArray0======", postArray[0])
      console.log("====================PostArray1======", postArray[1]);
      postArray1.push(postArray[1]);

      /* const postArray3 = [];
       for (const key in postArray[1]) {
         postArray3.push(res[key]);
       }*/
      console.log("====================PostArray1 after pusg======", postArray1);
      return postArray;


    }));
  }
}
