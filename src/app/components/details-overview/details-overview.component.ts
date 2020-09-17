import { OverviewService } from './../../services/overview.service ';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Overview } from '../../models/overview';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-details-overview',
  templateUrl: './details-overview.component.html',
  styleUrls: ['./details-overview.component.css']
})
export class DetailsOverviewComponent implements OnInit {
  id: string;
  overview:Overview;
  myDate: string;
  dateOverview=[];

  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private overviewService: OverviewService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService

  ) { }

  ngOnInit() {
    console.log("ngOnInit executed");
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.overviewService.getOverview(this.id).subscribe(overview => {
      if (overview != null) 
        
      this.overview = overview;
      console.log(this.overview);
    });
  }

  ngOnInit_test() {
    console.log("ngOnInit executed");
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.overviewService.getOverview(this.id).subscribe(d => {
      var datePipe = new DatePipe('de-DE');
      datePipe.transform(d.date.toDate(), 'dd.MM.yyyy');
      this.dateOverview.push(datePipe.transform(d.date.toDate(), 'dd.MM.yyyy'))
      this.overview = d;
      //this.formatDate()
      console.log('Edit Overview', this.overview);
    });
  }

  onDeleteClick(){
    if(confirm('Are you sure?')){
      this.overviewService.deleteOverview(this.overview);
      this.flashMessage.show('Overview was removed',
      {cssClass:'alert-success',timeout:4000
    });
    this.router.navigate(['/'])
    }

  }

  updateBalance(){
    this.overviewService.updateOverview(this.overview);
      this.flashMessage.show('Balance updated',{
        cssClass:'alert-success',timeout: 4000
      });
    
    }
    formatDate(){
      var datePipe = new DatePipe('de-DE');
      this.myDate = datePipe.transform(this.overview.date.toDate(), 'dd.MM.yyyy');
      console.log ("MyDate",this.myDate);
    }

  }


