import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// RxJs
// use this fake server https://jsonplaceholder.typicode.com/todos

// get service
@Injectable({
  providedIn: 'root'
})
export class MyHttpService {

  constructor(private http: HttpClient){

  }

  get(url: string) {
    return this.http.get(url);
  }
}