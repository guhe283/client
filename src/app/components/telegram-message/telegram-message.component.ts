import { Photo } from './../../models/telegram-photo';
import { TableModule } from 'primeng/table';

import { TelegramPictureService } from './../../services/telegram-picture.service';

import { PrimeNGConfig } from 'primeng/api';
import { TelegramMessage } from '../../models/telegram';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TelegramMessageService } from 'src/app/services/telegram-message.service';
import { database } from 'firebase';
import { Result } from 'src/app/models/telegram-result';
import { Subscription } from 'rxjs/internal/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import { Customer, Representative } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customerservice';




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
  base64Image = 'data:image/png;base64,����';
  imagePath: any;


  //customers: Customer[];
  customers: Result[];

  representatives: Representative[];

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

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

    this.transform();
    console.log("Telegram ngOnInit subscribe getUpdate=====================>");
    this.subscription = this.message.getUpdate().subscribe(data => {

      //this.data3.push(... data);
      console.log("Telegram  ngOnInit Componente data====================================>", data);
      this.text = data.ok;
      console.log("Telegram  ngOnInit Componente text====================================>", this.text);
      this.customers = data.result;
      this.loading = false;
      console.log("Telegram  ngOnInit Componente Custumers====================================>", this.customers);

      this.findFileID();


    });

    /*this.subscription = this.photos.getPotos().subscribe(d => {
 
      //this.data3.push(... data);
      console.log("Telegram  Photodata====================================>", d);
    });*/

    this.getImageFromService();




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

  findFileID() {

    let t: any;
    let id: any;

    this.customers.forEach((element) => {
      if (element.message['photo']) {
        id = element['update_id']
        t = element.message['photo'][0].file_id
        console.log("RESULT=========================================>:", t ,"ID: ", id);

    }
    })

  }
}
