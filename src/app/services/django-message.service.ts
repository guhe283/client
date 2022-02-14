import { Message } from '../models/telegram-message';
import { Injectable } from '@angular/core';;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DjangoMessage } from '../models/django-message';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

let header = new HttpHeaders();
header.set('Access-Control-Allow-Origin', '*');

const baseUrl = 'http://localhost:8080/api/tutorials';
//const baseUrl = 'http://52.59.194.204:8080/api/tutorials';


//http://52.59.194.204:8000/admin/



@Injectable({
  providedIn: 'root'
})
export class DjangoMessageService {
  


  

  message: DjangoMessage[];

  configUrl: string = 'http://localhost:8000/employee/employee-viewset/'; //lovalhost
//configUrl: string = '/posts/employee/employee-viewset/';
  // configUrl1: string = 'http://172.31.44.120:8000/employee/employee-viewset/'; //aws
    configUrl2: string = 'http://ec2-3-121-184-45.eu-central-1.compute.amazonaws.com:8000/employee/employee-viewset/';
    //configUrl1: string = 'localhost:8000/test2/employee/employee-viewset/';
    //configUrl7: string = 'aws2/employee/employee-viewset/';  // worked in aws
    //configUrl6: string = 'www.guhe283.at/aws3/employee/employee-viewset/';  // worked in aws

   // configUrl1: string = 'http://localhost:8000/rrr';
   //configUrl: string = 'localhost:8000/aws1/employee/employee-viewset/';
  //configUrl: string = 'http://localhost:4200/myapi'
  //updateUrl: string = 'https://api.telegram.org/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/getUpdates'
  constructor(private http: HttpClient) {
  }
 
  getUpdate() {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };
  
    return this.http.get<DjangoMessage>(this.configUrl2).pipe(map(res => {
      requestOptions
      return new DjangoMessage(res);

    },));
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