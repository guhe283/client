import { TelegramPictureService } from '../../services/telegram-picture.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/app/models/telegram-result';
import { Subscription } from 'rxjs/internal/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import { Representative } from 'src/app/models/customer';
import { DjangoMessageService } from 'src/app/services/django-message.service';
import { Chips } from 'primeng/chips';




@Component({
  selector: 'app-django-message',
  templateUrl: './django-message.component1.html',
  styleUrls: ['./django-message.component.css']
})


export class DjangoMessageComponent implements OnInit {

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
  base64Image = 'data:image/png;base64,ï¿½ï¿½ï¿½ï¿½';
  imagePath: any;
  id11: string;


  //customers: Customer[];
  customers: any[] = [];
  customers1: Result[];
  //users: User[];

  products = [];
  //products1: Product[];

  representatives: Representative[];

  statuses: any[];
  cols: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  loadedCharacter: {};



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private message: DjangoMessageService,
    private sanitizer: DomSanitizer,
    private photos: TelegramPictureService

  ) { }



  ngOnInit() {

    console.log("Django ngOnInit subscribe getUpdate=====================>");
    this.subscription = this.message.getUpdate().subscribe(data => {
      this.products = data['result'];
      //this.products.push(JSON.stringify(data));

      //this.data3.push(... data);
      console.log("Django ngOnInit GetUpdate data ====================================>", data['result']);
      console.log("Django ngOnInit GetUpdate data ====================================>", data['result']);
      console.log("Django ngOnInit GetUpdate -->this products====================================>", this.products);
      //this.users.push(data);
      console.log("Django ngOnInit GetUpdate 5this customers====================================>", this.customers);
      console.log("Django ngOnInit GetUpdate 5this customers results ====================================>", this.customers[0]);
     


      this.loading = false;


    });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    //this.subscription1.unsubscribe();

  }




}