import { OverviewService } from './../../services/overview.service ';
import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Overview } from '../../models/overview';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-overviews',
  templateUrl: './overviews.component.html',
  styleUrls: ['./overviews.component.css']
})
export class OverviewsComponent implements OnInit {
  overviews: Overview[];
  totalOwed: number;
  invest=[];
  dateOverview=[];

  constructor( private overviewService: OverviewService) { }

  ngOnInit() {
    this.overviewService.getOverviews().subscribe(
      cl =>{
         this.overviews  = cl;
        // this.getTotalOwed();

        this.overviews.map(data => {
          var datePipe = new DatePipe('de-DE');
          datePipe.transform(data.date.toDate(), 'dd.MM.yyyy');
          console.log("new date1----------------------------------------------->", datePipe);
          this.dateOverview.push(datePipe.transform(data.date.toDate(), 'dd.MM.yyyy'))

        });
        console.log("new date2----------------------------------------------->", this.dateOverview);

      }

    );
  }
    /*getTotalOwed(){
     this.totalOwed = this.overviews.reduce((total,client)=>{
        return total + parseFloat(client.balance.toString());
      },0);
    }*/


/*


 this.investService.getInvests().subscribe(
      cl => {
        this.invest = cl;
        this.invest.map(data => {
          var datePipe = new DatePipe('de-DE');
          datePipe.transform(data.date.toDate(), 'dd.MM.yyyy');
          console.log("new date1", datePipe);
          this.investDate.push(datePipe.transform(data.date.toDate(), 'dd.MM.yyyy'))

        });
        this.investAmount = this.invest.map(data => data.amount);
        this.investAddAmount = this.invest.reduce((acc, am) =>
          acc + am.amount, 0);

        console.log("investAddAmount:", this.investAddAmount);
        //return accumulator + currentValue;


        console.log("investDate:", this.investDate);
        console.log("investAmount:", this.investAmount);

      });

*/


    

  }