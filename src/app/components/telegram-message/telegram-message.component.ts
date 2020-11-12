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
      console.log("Componente data1====================================>", data);
      const postArray = [];
      for (const key in data) {
        postArray.push(data[key]);
      }
      console.log("====================PostArray======",postArray)
    
      this.data3=data;
      //this.data3=postArray;

      /*
            for (var val of data.result) {
              console.log("=========================================>val",val);
              this.data3=val['message'];
              console.log("=========================================>val",val['message']);
              console.log("=============================data3============>val",this.data3);
          }*/
      //this.message= responeData.result;
      //this.message.push(...data);
      //console.log("Arrya result====================================>", data.result[0].update_id);
      var a = JSON.stringify(data);
      // console.log("Arrya result2====================================>", data.result[0]);
      console.log("result a3 ====================================>", a);
      console.log("result a4 ====================================>", a.match("text"));

      //this.text.push(...data.result[0]);
      console.log("Arrya text5====================================>", this.text);
      console.log("Arrya text6====================================>", this.data1);

      var data1 = [];
      data1.push(a);

      console.log(data1);
      this.data2 = data1;

      console.log("Arrya text117====================================>", data1);
      console.log("Arrya text228====================================>", this.data2);



    });



  };
  //this.isin = this.route.snapshot.params['isin'];
  //this.fetchData();
  /*
   getUpdate1() {
      console.log("getUpdate===>");
      return this.http.get<TelegramMessage >(this.updateUrl).subscribe(data => {
        console.log("data====================================>", data);
        //this.message= responeData.result;
        //this.message.push(...data);
        console.log("Arrya result====================================>", data.result[0].update_id);
        console.log("Arrya result====================================>", data.result[0].text);
        //this.message.push(...data.result[0]);
        
  
  
      });
  
    }
  
  */


  /* fetchData() {
     this.message.getUpdate()(responeData => {
  
       console.log("Subscribe ResponseData====================================>", responeData)
      // console.log("Subscribe ResponseData message_is====================================>", responeData['update_id'])
       this.data1=responeData;
  
  
  
  
     });
  
   }*/

  getData() {
    console.log("getData=====================>", this.data1);
    var a = this.data1;
    console.log("var a ==================================>", a);
    const postsArray = [];
    Object.keys(a).forEach(function (key) {

      console.log("Show keys==============>", a[key]);
      postsArray.push({ ...a[key] })
      console.log("PostsArray==================================>", postsArray);
    });
    this.data2 = postsArray;
    console.log("Data2==================================>", this.data2);
    console.log("Data2==================================>", this.data2[1].update_id);
    console.log("Data2==================================>", this.data2[0].message.date);
    console.log("Data2==================================>", this.data2[0].message.chat.id);
    console.log("Data2==================================>", this.data2[0].message.text);
    //console.log("update_uid==================================>", this.data2[1].update_uid);

    for (let entry of this.data2) {
      console.log("================================1", entry); // 1, "string", false
    }

    /*const obj = this.data2[0].message;
    obj.forEach(function (message) {
      console.log("=================================for",message.text);
    })*/

    for (var val of this.data2) {
      console.log("==========data2=================2", this.data2)
      console.log(val); // prints values: 10, 20, 30, 40
    }
    console.log("============data2================3r", this.data2)
    for (let speakerElement of this.data2) {
      console.log("Speaker element", speakerElement);// element is JSON 

    }


  }

}



/*
this.configuredCommandsSubscription = this.commandQueryService
              .getAllCommands(this.selectedSelectionNode).subscribe((commands) => {
              this.allCommands = [];
              this.filterCommandsValue = [];
              commands.forEach(command => {
                  const urnElements = command.commandURN.split(':');
                  const commandType = urnElements[urnElements.length - 1];
                  const commandName = this.localizationService
                      .getCommandNameTranslation(this.selectedSelectionNode.connectorUrn, command.commandURN);
                  this.allCommands.push({label: commandName, value: commandType});
                  this.filterCommandsValue.push(commandType);
                  this.commandsAvailable = true;
              });
*/



