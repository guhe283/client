import { FormatDateService } from '../../services/format-date.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { InvestService } from '../../services/invest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import * as firebase from 'firebase';
import { Invest } from '../../models/invest';
import { formatDate, DatePipe } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';


@Component({
  selector: 'app-edit-invest',
  templateUrl: './edit-invest.component.html',
  styleUrls: ['./edit-invest.component.css']
})
export class EditInvestComponent implements OnInit {
  
  id: string;
  investDate=[];

  
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
    private route: ActivatedRoute,
     private convertDatetoTimestamp: FormatDateService
   
  ) { }




  ngOnInit() {
    console.log("ngOnInit executed");
    // Get id from url
    this.id = this.route.snapshot.params['id'];

    // Get client
    this.investService.getInvest(this.id).subscribe(d => {
      var datePipe = new DatePipe('de-DE');
      datePipe.transform(d.date.toDate(), 'dd.MM.yyyy');
      this.investDate.push(datePipe.transform(d.date.toDate(), 'dd.MM.yyyy'))
      this.invest = d;
      this.invest.date = this.investDate;
      //this.formatDate()
      console.log('Edit Invest=====>', this.invest);
      console.log('Date Invest=====>', this.investDate);
    });
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
      this.router.navigate(['/invest']);
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
