import { from } from 'rxjs';
import { InvestService } from '../../services/invest.service';
import { Component, OnInit } from '@angular/core';
import { Invest } from '../../models/invest';

@Component({
  selector: 'app-invests',
  templateUrl: './invests.component.html',
  styleUrls: ['./invests.component.css']
})
export class InvestsComponent implements OnInit {
  invest :Invest[];
  totalOwed: number;

  constructor( private investService: InvestService) { }

  ngOnInit() {
    this.investService.getInvests().subscribe(
      cl =>{
         this.invest = cl;
         //this.getTotalOwed();
      }

    );
  }
    /*getTotalOwed(){
     this.totalOwed = this.clients.reduce((total,client)=>{
        return total + parseFloat(client.balance.toString());
      },0);
    }*/
    

  }