import { MyHttpService } from './../../services/test';
import { from } from 'rxjs';
import { StockService } from '../../services/stock.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { Stock } from 'src/app/models/stock';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stocks: Stock[];
  totalOwed: number;

  constructor(private stockService: StockService,
    private myHttp: MyHttpService) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe(
      cl => {
        this.stocks = cl;
        //this.getTotalOwed();
      }

    );
    //this.stockService.getIsin();
    // Test RxJs
    this.myHttp.get('https://jsonplaceholder.typicode.com/todos').pipe(
      map((res: any) =>
        res.map((data) => {
          return {
            id: data.id,
            completed: data.completed
          };
        })
      )
    ).subscribe(console.log)



    // Test RxJs nests array with objects
    this.myHttp.get('https://jsonplaceholder.typicode.com/users').pipe(
      map((res: any) =>
        res.map((data) => {
          return {
            id: data.id,
            allAdresses: data['address'],
            onlyStreet: data['address'].street,
            geoAll: data['address'].geo,
            geoLat: data['address'].geo.lat,
            website: data.website,
            company: data['company'].catchPhrase
          };
        })
      )
    ).subscribe(console.log)
  }
}
  /*getTotalOwed(){
   this.totalOwed = this.clients.reduce((total,client)=>{
      return total + parseFloat(client.balance.toString());
    },0);
  }*/


