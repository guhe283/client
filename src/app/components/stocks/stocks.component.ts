import { from } from 'rxjs';
import { StockService } from '../../services/stock.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { Stock } from 'src/app/models/stock';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stocks :Stock[];
  totalOwed: number;

  constructor( private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe(
      cl =>{
         this.stocks = cl;
         //this.getTotalOwed();
      }

    );
    //this.stockService.getIsin();
  }
    /*getTotalOwed(){
     this.totalOwed = this.clients.reduce((total,client)=>{
        return total + parseFloat(client.balance.toString());
      },0);
    }*/
    

  }