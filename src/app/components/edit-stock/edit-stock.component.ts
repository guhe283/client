
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Overview } from '../../models/overview';
import { validateEventsArray } from 'angularfire2/firestore';
import { formatDate, DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { FormatDateService } from './../../services/format-date.service';
import { StockService } from 'src/app/services/stock.service';
import { Stock } from 'src/app/models/stock';


@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})

export class EditStockComponent implements OnInit {
  stocks1 :Stock[];

 isin:string;
  id: string;
  stock: Stock = {
    name: '',
    isin: ''
  }

  myDate: String;
  disableBalanceOnEdit: boolean = true;
  dateOverview=[];


  constructor(
    private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private convertDatetoTimestamp: FormatDateService
  ) { }

  ngOnInit_orig() {
    console.log("ngOnInit executed");
    // Get id from url
    this.isin = this.route.snapshot.params['isin'];
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.stockService.getOverview(this.id).subscribe(d => {
      this.stock = d;
      //this.formatDate()
      console.log('Edit Overview', this.stock);
    });
  }


/*


 ngOnInit() {
   //this.notes =  this.stockService.getIsin();

    
    this.id = this.route.snapshot.params['id'];
    console.log("Route id---------------------", this.id)
    this.stockService.getStock(this.id).subscribe(overview => {
      if (overview != null) 
        
      this.overview = overview;
      console.log("Result------------------------------",this.overview);
    });
  }


*/


ngOnInit() {
    console.log("ngOnInit executed--------------------------");
    // Get id from url
    this.isin = this.route.snapshot.params['isin'];
    console.log("ISIN:-----------------", this.isin);
    this.id = this.route.snapshot.params['id'];
    console.log("ID:-----------------", this.id);
    // Get client
    this.stockService.getOverview(this.id).subscribe(d => {
     // var datePipe = new DatePipe('de-DE');
      //datePipe.transform(d.date.toDate(), 'dd.MM.yyyy');
      //this.dateOverview.push(datePipe.transform(d.date.toDate(), 'dd.MM.yyyy'))
      this.stock = d;
      //this.formatDate()
      console.log('NO OnInit-----------------------', this.stock);
    });
  }





  ngOnInit_ALT() {

    this.id = this.route.snapshot.params['id'];
    console.log("Get id from routerLink", this.id)
    this.stockService.getStocks().subscribe(
      cl =>{
        console.log("Init Stocks", cl);
        
         this.stocks1 = cl;
         //this.getTotalOwed();
      }

    );
    console.log("ID:-------------------------", this.id);
    console.log("ngOnInit executed");
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.stockService.getOverview(this.id).subscribe(d => {
      //var datePipe = new DatePipe('de-DE');
      //datePipe.transform(d.date.toDate(), 'dd.MM.yyyy');
      //this.dateOverview.push(datePipe.transform(d.date.toDate(), 'dd.MM.yyyy'))
      this.stock = d;
      //this.formatDate()
      console.log('Edit Stock------------------------------------>', this.stock);
    });
  }



  onSubmit({ value, valid }: { value: Stock, valid: boolean }) {
    if (!valid) {

    } else {
      // Add id to client
      value.id = this.id;
      console.log ("Bevor call the service ----------------------------------------------------",value.id)
      //value.date = this.convertDatetoTimestamp.getFormatedDate(value.date);
      this.stockService.updateStock(value);
      this.flashMessage.show('Overview updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/stock/' + this.id]);
    }

  }

}

/*
 this.overviews.map(data => {
          var datePipe = new DatePipe('de-DE');
          datePipe.transform(data.date.toDate(), 'dd.MM.yyyy');
          console.log("new date1----------------------------------------------->", datePipe);
          this.dateOverview.push(datePipe.transform(data.date.toDate(), 'dd.MM.yyyy'))
*/
