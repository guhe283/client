import { Key } from 'protractor';

import { TelegramMessage } from './../../models/telegram_message';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TelegramMessageService } from 'src/app/services/telegram-message.service';
import { database } from 'firebase';


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
  data3: TelegramMessage[];


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
      console.log("ngOnInit Componente data1====================================>", data);
      const postArray = [];
      for (const key in data) {
        postArray.push(data[key]);
      }
      console.log("ngOnInit ====================PostArray======", postArray)

      this.data3=data;
      this.data3 = postArray;
    });
  }
}
