
import { Injectable } from '@angular/core';;
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class InfoStockService {


  configUrl: string = 'https://api.lemon.markets/rest/v1/data/instruments/';
  constructor(private http: HttpClient) {
  }



    getConfig(isin: string){
      console.log("Paramter===>", isin)
      var url  = this.configUrl + isin +'/';
      console.log("String ===>", url)
      return this.http.get(url);
    }

  }
