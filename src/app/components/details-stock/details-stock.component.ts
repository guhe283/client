import { InfoStockService } from './../../services/info-stock.service';
import { InvestService } from './../../services/invest.service';
import { Stock } from './../../models/stock';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { observable, Observable } from 'rxjs';
import { StockService } from '../../services/stock.service';



@Component({
  selector: 'app-details-stock',
  templateUrl: './details-stock.component.html',    
  styleUrls: ['./details-stock.component.css']
})


export class DetailsStockComponent implements OnInit {
  id: string;
  isin: string;
  notes: Observable<Stock>;
  overview: Stock;
  //myDate: string;
  dateOverview = [];


  //totalOwed: number;

  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private infoStock: InfoStockService
  ) { }

  ngOnInit() {
    //this.notes =  this.stockService.getIsin();

    this.isin = this.route.snapshot.params['isin'];
    console.log("Route ISIN===>", this.isin)
    
    this.id = this.route.snapshot.params['id'];
    console.log("Route id---------------------", this.id)
    this.stockService.getStock(this.id).subscribe(overview => {
      if (overview != null)

        this.overview = overview;
        this.isin= overview.isin;
        console.log("Route ISIN===>", this.isin)
      console.log("Result------------------------------", this.overview);
    });
    
  }


  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.stockService.deleteStock(this.overview);
      this.flashMessage.show('Overview was removed',
        {
          cssClass: 'alert-success', timeout: 4000
        });
      this.router.navigate(['/stock/'])
    }

  }

  


  updateBalance() {
    //this.overviewService.updateOverview(this.overview);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success', timeout: 4000
    });

  }

}


