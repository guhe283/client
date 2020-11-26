import { TelegramAll } from './../models/telegram-all';
import { File } from './../models/telegram-file';
import { Message } from '../models/telegram-message';
import { Injectable } from '@angular/core';;
import { HttpClient } from '@angular/common/http';
import { TelegramMessage } from '../models/telegram';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TelegramPictureService {
  file: File[];
  imageurl: any;

  configUrl: string = 'https://api.lemon.markets/rest/v1/data/instruments/';
  updateUrl: string = 'https://api.telegram.org/file/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/photos/file_0.jpg'
  pictureUrl: string = 'https://api.telegram.org/file/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/photos/'
  constructor(private http: HttpClient) {
  }

  getUpdateOrig() {
    console.log("Telegram =============Service GetUpdate===========================>");
    return this.http.get<TelegramMessage>(this.updateUrl).pipe(map(res => {
      return new TelegramMessage(res);

    }));
  }

  /*
    getUpdate2() {
      return this.http.get<TelegramMessage>(this.updateUrl).pipe(filter(x => x.message === true), map(x => {
        console.log("=============Service GetUpdate===========================>", x)
        return new TelegramMessage(x);
  
      }));
    }*/

  /*
getUpdate() {
  console.log("=============Service GetUpdate before filter===========================>")
  return this.http.get<TelegramMessage>(this.updateUrl).pipe(filter(x => x.message !== null || x.photo!==null),
    map((x => {
      console.log("=============Service GetUpdate after filter===========================>", x)
      return new TelegramMessage(x);
    })));


}

  */


  getPotos1() {
    console.log("=============Service GetPotos before filter===========================>");
    return this.http.get("tel1").pipe(
      map((x => {
        console.log("=============Service GetPhotos after filter===========================>", x);
        //return new TelegramMessage(x);
      })));


  }



  getPhoto(picture: string) {
    const url = `${this.pictureUrl}${picture}`;
    return this.http.get<File>(url).pipe(filter(x => x.file_path !== null),
    map((x => {
 
//console.log(obj.myString);
      console.log("=============Service GetFile after filter99999999===========================>", x)
      return new File(x);
    })));


}


  /*
  getUpdate1() {
    return this.http.get<TelegramMessage>(this.updateUrl).pipe(map(res => res), filter(x => x.message !== null));
  
  
  };*/

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }
  /*
  https://api.telegram.org/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/getFile?file_id=AgACAgQAAxkBAANBX7tPu32lQJVsMGOQIPke8JFzWcUAAke0MRtqQeFRFX1xvI7eyLv-hLQnXQADAQADAgADeQADroQCAAEeBA
  
  */

  /*
 
  getUpdate() {
    console.log("=============Service GetUpdate before filter===========================>")
    return this.http.get<TelegramMessage>(this.updateUrl).pipe(filter(x => x.message !== null || x.photo!==null),
      map((x => {
        console.log("=============Service GetUpdate after filter===========================>", x)
        return new TelegramMessage(x);
      })));


  }
  */

  fileUrl: string = 'https://api.telegram.org/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/getFile?file_id=';

  getFile(fileId: string) {
    const url = `${this.fileUrl}${fileId}`;
    return this.http.get<File>(url).pipe(filter(x => x.file_path !== null),
    map((x => {
 
//console.log(obj.myString);
      console.log("=============Service GetFile after filter99999999===========================>", x)
      return new File(x);
    })));


}
    /*
        return this.http.get(url).pipe(map((x => {
          console.log("=============Service GetFile======================================== ===========================>", x);
          
          //return new TelegramMessage(x);
        })));*/

  
}


/*

Get File
https://api.telegram.org/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/getFile?file_id=AgACAgQAAxkBAANBX7tPu32lQJVsMGOQIPke8JFzWcUAAke0MRtqQeFRFX1xvI7eyLv-hLQnXQADAQADAgADeQADroQCAAEeBA

Get Photos
https://api.telegram.org/file/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/photos/file_2.jpg

*/

