import { Message } from './../../models/message';
import { Key } from 'protractor';

import { TelegramMessage } from './../../models/telegram_message';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TelegramMessageService } from 'src/app/services/telegram-message.service';
import { database } from 'firebase';
import { Result } from 'src/app/models/result';


@Component({
  selector: 'app-telegram-message',
  templateUrl: './telegram-message.component.html',
  styleUrls: ['./telegram-message.component.css']
})


export class TelegramMessageComponent implements OnInit {

  text: any;
  data1: [];
  data2: any[];
  //myDate: string;
  data3: Result[];


  //totalOwed: number;

  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: TelegramMessageService
  ) { }

    ngOnInit() {
      console.log("ngOnInit fetch data=====================>");
      this.message.getUpdate().subscribe(data => {
  
        //this.data3.push(... data);
        console.log("ngOnInit Componente data====================================>", data);
        this.text=data.ok;
        this.data3=data.result;
        console.log("ngOnInit Componente data3====================================>",this.data3);
        console.log("ngOnInit Componente data3====================================>",data.result[0]);
        console.log("ngOnInit Componente data3====================================>",data.result[1]);
        
        
        
       
      });
    }
}
