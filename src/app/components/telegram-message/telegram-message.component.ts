import { Customer } from './../../models/customer';
import { debounceTime, filter, mergeMap, switchMap } from 'rxjs/operators';

import { TelegramPictureService } from './../../services/telegram-picture.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TelegramMessageService } from 'src/app/services/telegram-message.service';
import { Result } from 'src/app/models/telegram-result';
import { Subscription } from 'rxjs/internal/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import { Representative } from 'src/app/models/customer';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {MenuItem} from 'primeng/api';





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
  img = 'https://api.telegram.org/file/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/photos/file_0.jpg';


  //totalOwed: number;

  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  subscription: Subscription;
  subscription1: Subscription;
  base64Image = 'data:image/png;base64,����';
  imagePath: any;
  id11: string;


  //customers: Customer[];
  customers: any[];
  customers1: Result[];

  representatives: Representative[];

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  loadedCharacter: {};
  homeworld: Observable<{}>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: TelegramMessageService,
    private sanitizer: DomSanitizer,
    private photos: TelegramPictureService,

  ) { }

  transform() {
    this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
  }

  ngOnInit() {

    //this.testForkJoin();
    //this.loading = false;

    /*
    let character = this.message.getUpdate()
    let characterHomeworld =  this.photos.getFile("t").subscribe();
    

    forkJoin([character, characterHomeworld]).subscribe(results => {
      // results[0] is our character
      // results[1] is our character homeworld
      results[0].homeworld = results[1];
      this.loadedCharacter = results[0];
    });*/



    // this.subscription1 = this.photos.getFile(t).subscribe();


    /*
    
    
    
        this.message.getUpdate().subscribe(character => {
          this.customers = character.result;
    
          var fileId = this.findFileID();
          setTimeout(() => {
    
          }, 6000);
    
    
          console.log("==========================xxxxxxxxxxxx111111==================================", character);
          console.log("==========================xxxxxxxxxxxx111112==================================", this.customers);
          console.log("==========================xxxxxxxxxx33333==================================", fileId);;
          this.photos.getFile(fileId).subscribe(homeworld => {
            setTimeout(() => {
    
            }, 6000);
            // character.homeworld = homeworld;
            console.log("==========================xxxxxxxxxxxx2222299==================================", homeworld);
            this.loadedCharacter = character;
            this.customers['result'].push(homeworld);
            console.log("==========================xxxxxxxxxxxx2222222==================================", this.loadedCharacter);
            console.log("==========================xxxxxxxxxxxx44444444==================================", this.customers);
            //console.log("==========================xxxxxxxxxxxx555555555555==================================", this.customers[0].path_image[0]);
          });
        });
        this.loading = false;
        console.log("==========================xxxxxxxxxxxx2222222a==================================", this.loadedCharacter);
        console.log("==========================xxxxxxxxxxxx555555555555b==================================", this.customers);
    
    */


    

    this.transform();
    console.log("Telegram ngOnInit subscribe getUpdate=====================>");
    this.subscription = this.message.getUpdate().subscribe(data => {

      //this.data3.push(... data);
      console.log("Telegram  ngOnInit GetUpdate Map Data FileIDIDIDIDIdata!!!!!!!!!!!!!====================================>", data);
      this.text = data.ok;
      console.log("Telegram  ngOnInit GetUpdate Map Data data File_ID====================================>", data.message['photo'].file_id);
                                                                                                   //element.message['photo']['file_id][0]
      
      console.log("Telegram  ngOnInit Componente text====================================>", this.text);
      this.customers = data.result;
      this.loading = false;
      console.log("Telegram  ngOnInit Componente text22====================================>", this.customers);
     //console.log("Telegram  ngOnInit Componente Custumers Array====================================>", this.customers[0].message.photo[0].file_sized);

      this.findFileID();
      this.loading = false;


    });

    /*this.subscription = this.photos.getPotos().subscribe(d => {
 
      //this.data3.push(... data);
      console.log("Telegram  Photodata====================================>", d);
    });*/

    //this.getImageFromService();




    /////
    /*
        this.customerService.getCustomersLarge().then(customers => {
          this.customers = customers;
          this.loading = false;
    
          this.customers.forEach(
            customer => (customer.date = new Date(customer.date))
          );
        });*/
    /*
        this.representatives = [
          { name: "Amy Elsner", image: "amyelsner.png" },
          { name: "Anna Fali", image: "annafali.png" },
          { name: "Asiya Javayant", image: "asiyajavayant.png" },
          { name: "Bernardo Dominic", image: "bernardodominic.png" },
          { name: "Elwin Sharvill", image: "elwinsharvill.png" },
          { name: "Ioni Bowcher", image: "ionibowcher.png" },
          { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
          { name: "Onyama Limba", image: "onyamalimba.png" },
          { name: "Stephen Shaw", image: "stephenshaw.png" },
          { name: "XuXue Feng", image: "xuxuefeng.png" }
        ];
    
        this.statuses = [
          { label: "Unqualified", value: "unqualified" },
          { label: "Qualified", value: "qualified" },
          { label: "New", value: "new" },
          { label: "Negotiation", value: "negotiation" },
          { label: "Renewal", value: "renewal" },
          { label: "Proposal", value: "proposal" }
        ];*/



    /////
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();

  }

  getImageFromService() {
    //this.isImageLoading = true;
    this.photos.getImage("tel1").subscribe(data => {
      this.createImageFromBlob(data);
      console.log("DATADATA__________________________________>", data)
      //this.isImageLoading = false;
    }, error => {
      //this.isImageLoading = false;
      console.log(error);
    });
  }

  imageToShow: any;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
      console.log("Image to show=======================================================================>", this.imageToShow)
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  findFileID(): string {

    /*
var source = Observable.fromEvent<MessageEvent>(websocket, 'message', (e) => JSON.parse(result.data));

 var sourceA = source.filter(result => result.id === 'A');

    */

    var t: string;
    let id: any;

    this.customers.forEach((element) => {
      if (element.message['photo']) {
        id = element['update_id']
        t = element.message['photo'][0].file_id
        console.log("RESULT Mthode findFileID=========================================>:", t, "ID: ", id);
        console.log("RESULT Mthode Array bfore=========================================>:", this.customers);
        //console.log("RESULT Mthode Array bfore=========================================>:", this.customers['message'].caption);
        let v =this.subscription1 = this.photos.getFile(t).subscribe(data => {
        

          //this.data3.push(... data);
          console.log("Telegram  ngOnInit Componente Fer Phot Map Path image-->data====================================>", data.path_image);;
        //element.message['photo'].push({'file_path':'test1111'});
        console.log("RESULT Mthode Array bfore== last index v=======================================>:", data);
        element.message['photo'].push(data);
        console.log("RESULT Mthode Array bfore== last index=======================================>:", this.customers);
        // Array customer


      })}
    });
    
    return t;
 
}

  testForkJoin() {
    forkJoin([
      this.message.getUpdate().pipe(tap(data => {
       

        //this.data3.push(... data);
        console.log("Forge1====================================>", data);
        this.customers = data.result;
        this.id11 = this.findFileID();
        debounceTime(2500);
        console.log("Forge ID====================================>", this.id11);
      
      })),
      this.photos.getFile(this.id11).pipe(tap(d => {
        //this.customers.push(d.photo);
        //this.data3.push(... data);
        console.log("Foreg2a====================================>", d);
      }))
    
    ]).subscribe(r => {
      console.log("Result ForkJoin===>", r);
      this.customers=r;
      console.log("last===================================>", this.customers);
      console.log("Foreg2a====================================>", r);

    })

  }

}

