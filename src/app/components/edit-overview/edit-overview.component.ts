import { OverviewService } from './../../services/overview.service ';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Overview } from '../../models/overview';
import { validateEventsArray } from 'angularfire2/firestore';
import { formatDate, DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { FormatDateService } from './../../services/format-date.service';


@Component({
  selector: 'app-edit-overview',
  templateUrl: './edit-overview.component.html',
  styleUrls: ['./edit-overview.component.css']
})
export class EditOverviewComponent implements OnInit {
  id: string;
  overview: Overview = {
    date: '',
    depot: 0,
    cash: 0
  }

  myDate: String;
  disableBalanceOnEdit: boolean = true;
  dateOverview=[];


  constructor(
    private overviewService: OverviewService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private convertDatetoTimestamp: FormatDateService
  ) { }

  ngOnInit_orig() {
    console.log("ngOnInit executed");
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.overviewService.getOverview(this.id).subscribe(d => {
      this.overview = d;
      //this.formatDate()
      console.log('Edit Overview', this.overview);
    });
  }

  ngOnInit() {
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



  onSubmit({ value, valid }: { value: Overview, valid: boolean }) {
    if (!valid) {

    } else {
      // Add id to client
      value.id = this.id;
      console.log ("Bevor call the service ----------------------------------------------------",value.date)
      value.date = this.convertDatetoTimestamp.getFormatedDate(value.date);
      this.overviewService.updateOverview(value);
      this.flashMessage.show('Overview updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/overview/' + this.id]);
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
