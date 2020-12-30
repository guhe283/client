import { Message } from '../models/telegram-message';
import { Injectable } from '@angular/core';;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DjangoMessage } from '../models/django-message';
import { map, filter } from 'rxjs/operators';

let header = new HttpHeaders();
header.set('Access-Control-Allow-Origin', '*');


@Injectable({
  providedIn: 'root'
})
export class DjangoMessageService {
  message: DjangoMessage[];

  //configUrl: string = 'http://localhost:8000/employee/employeeemployee/';
  configUrl: string = '/posts/employee/employeeemployee/';
  //updateUrl: string = 'https://api.telegram.org/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/getUpdates'
  constructor(private http: HttpClient) {
  }

  getUpdate() {
    console.log("Telegram =============Service GetUpdate===========================>");
    return this.http.get<DjangoMessage>(this.configUrl).pipe(map(res => {
      console.log("=============Django===========================>", res)
      return new DjangoMessage(res);

    }));
  }
}