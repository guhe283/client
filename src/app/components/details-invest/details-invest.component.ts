import { Invest } from './../../models/invest';
import { InvestService } from './../../services/invest.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-details-invest',
  templateUrl: './details-invest.component.html',
  styleUrls: ['./details-invest.component.css']
})


export class DetailsInvestComponent implements OnInit {
       
 
  notes: Observable<Invest>;
  id:string;
  inv: Invest;
  dateInvest= [];
  inf1 :boolean =true;


  //totalOwed: number;

  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private investService: InvestService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    //this.notes =  this.stockService.getIsin();

    this.id = this.route.snapshot.params['id'];
    console.log("Route id---------------------", this.id)
    this.investService.getInvest(this.id).subscribe(data => {
      console.log("Data===>", data)
    
      if (data != null){
        console.log("TRUE");


     this.inv = data;
      console.log("Result------------------------------", this.inv);
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


