
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Result } from 'src/app/models/telegram-result';
import { Subscription } from 'rxjs/internal/Subscription';
import { Representative } from 'src/app/models/customer';
import { DjangoMessageService } from 'src/app/services/django-message.service';
import { Product } from 'src/app/models/product';

import { ConfirmationService, Message, MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';



@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  providers: [],
  styleUrls: ['./paypal.component.scss']
})



export class PaypalComponent implements OnInit {

 

  constructor(
   

  ) {

  }

  // this.cities=[{name:'motivated', code:'1'}, {name:'unmotivated', code:'0'}];
@ViewChild('paypalRef',{static:true}) private paypalRef:ElementRef;
  ngOnInit():void {
    console.log("==========================================================>",window.paypal);
    window.paypal.Buttons(
      {
        style:{
          layout:'horizontal',
          color:'blue',
          shape:'rect',
          label:'paypal'
        },
        createOrder:(data, actions)=>{
          return actions.order.create({
            purchase_units:[
              {
                amount:{
                  value:'10',
                  currency_code:'USD'
                }
              }
            ]
          });
        },
        onApprouve:(data,actions)=>{
          return actions.order.capture().then(details=>{
            alert('Transaction completed');
          });
        },
        onError: error=>{
          console.log(error);
        }
      }).render(this.paypalRef.nativeElement)
    


  }


}


