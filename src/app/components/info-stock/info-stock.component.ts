import { InfoStockService } from '../../services/info-stock.service';
import { Stock } from '../../models/stock';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-info-stock',
  templateUrl: './info-stock.component.html',
  styleUrls: ['./info-stock.component.css']
})


export class InfoStockComponent implements OnInit {


isin: string;
  data: Stock = {
    id: '',
    name: '',
    isin: '',
    type: '',
    symbol: ''

  }
 
  //myDate: string;


  //totalOwed: number;

  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private infoStock: InfoStockService
  ) { }

  ngOnInit() {
    this.isin = this.route.snapshot.params['isin'];
    this.infoStock.getConfig(this.isin).subscribe(posts => {
      console.log("Posts ===> ", posts)
      this.data = posts;
      console.log("Result post: ===>", this.data);
    });


  }




}


