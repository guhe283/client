import { FormatDateService } from './../../services/format-date.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { InvestService } from './../../services/invest.service';
import { Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import * as firebase from 'firebase';
import { Invest } from './../../models/invest';
import { formatDate, DatePipe } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';


@Component({
  selector: 'app-add-invest',
  templateUrl: './add-invest.component.html',
  styleUrls: ['./add-invest.component.css']
})
export class AddInvestComponent implements OnInit {
  invest: Invest = {
    date: '',
    amount: 0
  }

  disableBalanceOnAdd: boolean = true;
  //@ViewChild('clientForm') form1: any;
  @ViewChild('f') form: any;
 

  constructor(
    private flashMessage: FlashMessagesService,
    private investService: InvestService,
    private router: Router,   
     private convertDatetoTimestamp: FormatDateService
   
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Invest, valid: boolean}) {
  
   

    if(!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 6000
      });
    } else {
      // Add new 
      value.date = this.convertDatetoTimestamp.getFormatedDate(value.date);
      this.investService.newInvest(value);
      // Show message
      this.flashMessage.show('New invest added', {
        cssClass: 'alert-success', timeout: 6000
      });
      // Redirect to dash
      this.router.navigate(['/invests']);
    }


  }

  /*
 value.date = this.convertDatetoTimestamp.getFormatedDate(value.date);
      this.overviewService.updateOverview(value);
      this.flashMessage.show('Overview updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/overview/' + this.id]);
    }
  */
  


}
