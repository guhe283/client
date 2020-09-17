import { OverviewService } from './../../services/overview.service ';
import { Overview } from './../../models/overview';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormatDateService } from './../../services/format-date.service';


@Component({
  selector: 'app-add-overview',
  templateUrl: './add-overview.component.html',
  styleUrls: ['./add-overview.component.css']
})
export class AddOverviewComponent implements OnInit {

  overview: Overview = {
    date: '',
    depot: 0,
    cash: 0 
  }

  items1: Overview [];

  disableBalanceOnAdd: boolean = true;
  //@ViewChild('clientForm') form1: any;
  @ViewChild('f') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private overviewService: OverviewService,
    private router: Router,
    private convertDatetoTimestamp: FormatDateService
   
  ) { }

  ngOnInit() {
    this.overviewService.getOverviews().subscribe(
      cl =>{
         this.items1 = cl;
         console.log("Arrya items1=----------------->", this.items1);
         
  
      })
  
  }

  onSubmit({value, valid}: {value: Overview, valid: boolean}) {
   

    if(!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 6000
      });
    } else {
      // Add new client
      value.date = this.convertDatetoTimestamp.getFormatedDate(value.date)
      this.overviewService.newOverview(value);
      // Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 6000
      });
      // Redirect to dash
      this.router.navigate(['/']);
    }
  }

}