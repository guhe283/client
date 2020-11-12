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
      console.log("====================res======",res)
      const postArray = [];
      const postArray1 = [];
      for (const key in res) {
        postArray.push(res[key]);
      }
      console.log("====================PostArray======",postArray)
      console.log("====================PostArray======",postArray[0])
      console.log("====================PostArray======",postArray[1])
      return postArray[1];
    }));
    /*
      getUpdate1() {
        console.log("getUpdate===>");
        return this.http.get<TelegramMessage>(this.updateUrl).subscribe(data => {
          console.log("data====================================>", data);
          //this.message= responeData.result;
          //this.message.push(...data);
          //console.log("Arrya result====================================>", data.result[0].update_id);
          //console.log("Arrya result====================================>", data.result[0].text);
          //this.message.push(...data.result[0]);
    
    
    
        });
    
      }*/



    /*getUpdate1() {
      console.log("getUpdate===>");
      return this.http.get<TelegramMessage>(this.updateUrl).pipe(map(responeData => {
        const postsArray = [];
        for (const key in responeData) {
          if (responeData.hasOwnProperty(key)) {
            postsArray.push({ ...responeData[key] })
            console.log("postsArray with 2 array===>", postsArray);
            this.message = postsArray;
            console.log("Array message=============================>", this.message);
            console.log("Array message=============================>", this.message.forEach((value, index) => {
              console.log("index1=======>", index); // 0, 1, 2
              console.log("value1=======>", value); // 9, 2, 5 
              console.log("value0=======>", value); // 9, 2, 5
              this.message1 = value;
              console.log("Message1Array====================================>", this.message1)
                ;            // do something with obj[key]
            }));
          }
        }
        return postsArray;
      })
      )
    }*/



    /* getConfig(isin: string) {
       console.log("Paramter===>", isin)
       var url = this.configUrl + isin + '/';
       console.log("String ===>", url)
       return this.http.get(url);
     }
   
   }*/
  }
}