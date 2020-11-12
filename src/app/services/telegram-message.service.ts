import { Injectable} from '@angular/core';;
import { HttpClient } from '@angular/common/http';
import { TelegramMessage } from '../models/telegram';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TelegramMessageService {
  message: TelegramMessage[];

  configUrl: string = 'https://api.lemon.markets/rest/v1/data/instruments/';
  updateUrl: string = 'https://api.telegram.org/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/getUpdates'
  constructor(private http: HttpClient) {
  }

  getUpdate() {
    return this.http.get<TelegramMessage>(this.updateUrl).pipe(map(res => {
      console.log("=============Service GetUpdate===========================>", res)
      return new TelegramMessage(res);
    
    }));
  }
}