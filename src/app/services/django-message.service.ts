import { Message } from '../models/telegram-message';
import { Injectable } from '@angular/core';;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DjangoMessage } from '../models/django-message';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

let header = new HttpHeaders();
header.set('Access-Control-Allow-Origin', '*');

const baseUrl = 'http://localhost:8080/api/tutorials';



@Injectable({
  providedIn: 'root'
})
export class DjangoMessageService {


  message: DjangoMessage[];

  //configUrl: string = 'http://localhost:8000/employee/employeeemployee/';
  configUrl: string = '/posts/employee/employee-viewset/';
  //updateUrl: string = 'https://api.telegram.org/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/getUpdates'
  constructor(private http: HttpClient) {
  }

  getUpdate() {
    console.log("Telegram =============Service GetUpdate========= ConfigURL==================>",this.configUrl);
    return this.http.get<DjangoMessage>(this.configUrl).pipe(map(res => {
      console.log("=============Django Service GET===========================>", res)
      return new DjangoMessage(res);

    }));
  }

  public deletePost(id: string) {
    let endPoints = "1/"
    console.log("Django delete Post===========================>");
    return this.http.delete<DjangoMessage>(this.configUrl+ id +"/").pipe(map(res => {
      console.log("=============Django Delete===========================>", res)
      return new DjangoMessage(res);

    }));
  }

  public editPost(data: any, id: string) {
    let endPoints = "1/"
    console.log("Django delete Post===========================>");
    return this.http.put<DjangoMessage>(this.configUrl+ id +"/", data).pipe(map(res => {
      console.log("=============Django PUT===========================>", res)
      //return new DjangoMessage(res);

    }));
  }

  public addPost(data: any) {
    console.log("Django Add Post Data===========================>", data);
    return this.http.post<any>(this.configUrl,data).pipe(map(res => {
      console.log("=============Django ADD Post===========================>", res)
      return new DjangoMessage(null);

    }));
  }



  //////////////
  /*

  getAll(): Observable<DjangoMessagel[]> {
    return this.http.get<DjangoMessage[]>(baseUrl);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get(`${baseUrl}/${id}`);
  }*/

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
/*
  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
}*/


  /////////////
}