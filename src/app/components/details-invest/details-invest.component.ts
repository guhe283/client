import { Invest } from './../../models/invest';

import { InvestService } from './../../services/invest.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-details-invest',
  templateUrl: './details-invest.component.html',
  styleUrls: ['./details-invest.component.css']
})


export class DetailsInvestComponent implements OnInit {
       
  isUniquePage : boolean = true;
  notes: Observable<Invest>;
  id:string;
  inv: Invest={
    amount:0
  }
  investDate= [];
  inf1 :boolean =true;

  constructor(
    private investService: InvestService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    //this.id = this.route.snapshot.params['id'];
    console.log("Route id---------------------", this.id)
    this.investService.getInvest(this.id).subscribe(data => {

      var datePipe = new DatePipe('de-DE');
      datePipe.transform(data.date.toDate(), 'dd.MM.yyyy');
      this.investDate.push(datePipe.transform(data.date.toDate(), 'dd.MM.yyyy'))
      this.inv = data;
      this.inv.date = this.investDate;



      console.log("Data===>", data)
    
      if (data != null){
        console.log("TRUE");


     this.inv = data;
      console.log("Result======>", this.inv);
      }
    });
  }


  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.investService.deleteInvest(this.inv);
      this.flashMessage.show('Overview was removed',
        {
          cssClass: 'alert-success', timeout: 4000
        });
      this.router.navigate(['/invest/'])
    }

  }


  updateBalance() {
    //this.overviewService.updateOverview(this.overview);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success', timeout: 4000
    });

  }

}


