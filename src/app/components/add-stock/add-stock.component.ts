import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  stock: Stock = {
    name: '',
    isin: ''
  }

  disableBalanceOnAdd: boolean = true;
  //@ViewChild('clientForm') form1: any;
  @ViewChild('f') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private stockService: StockService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Stock, valid: boolean}) {
   

    if(!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 6000
      });
    } else {
      // Add new client
      this.stockService.newStock(value);
      // Show message
      this.flashMessage.show('New stock added', {
        cssClass: 'alert-success', timeout: 6000
      });
      // Redirect to dash
      this.router.navigate(['/stocks']);
    }
  }


}
