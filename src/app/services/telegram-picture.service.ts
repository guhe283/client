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
  message: TelegramMessage[];
  imageurl: any;

  configUrl: string = 'https://api.lemon.markets/rest/v1/data/instruments/';
  updateUrl: string = 'https://api.telegram.org/file/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/photos/file_0.jpg'
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


  getPotos() {
    console.log("=============Service GetPotos before filter===========================>");
    return this.http.get("tel1").pipe(
      map((x => {
        console.log("=============Service GetPhotos after filter===========================>", x);
        //return new TelegramMessage(x);
      })));


  }
  /*
  getUpdate1() {
    return this.http.get<TelegramMessage>(this.updateUrl).pipe(map(res => res), filter(x => x.message !== null));
  
  
  };*/

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

}


/*

http.get('./data.json')
  .map(res => res.json())
  .concatMap(res => res)
  .filter(x => x.value === 2)
  .subscribe(data => {
    this.d = data;
  });*/