//import { MessageService } from 'primeng/api/messageservice';

import { TelegramPictureService } from '../../services/telegram-picture.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/app/models/telegram-result';
import { Subscription } from 'rxjs/internal/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import { Representative } from 'src/app/models/customer';
import { DjangoMessageService } from 'src/app/services/django-message.service';
import { ProductService } from 'src/app/services/productservice';
import { Product } from 'src/app/models/product';
import {MessageService} from 'primeng/api';





@Component({
  selector: 'app-django-message',
  templateUrl: './django-message.component4.html',
  providers: [MessageService],
  styleUrls: ['./django-message.component.css']
})


export class DjangoMessageComponent implements OnInit {
  productDialog: boolean;
  submitted: boolean;

  text: any;
  data1: [];
  data2: any[];
  //myDate: string;
  data3: Result[];
  //img = 'https://api.telegram.org/file/bot1404339917:AAGv8WTIuKCRTjrSjlsKZCLUEzz0sX8AecM/photos/file_0.jpg';


  //totalOwed: number;
  first = 0;

  rows = 10;

  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  subscription: Subscription;
  subscription1: Subscription;
  //base64Image = 'data:image/png;base64,ï¿½ï¿½ï¿½ï¿½';
  imagePath: any;
  id11: string;
  selectedEmployee: string;
  mySelection: string;
  public tableData: any;
  public rowGroupMetadata: any;
  public selectedRow: any;
  selectedRows = [];

  //customers: Customer[];
  customers: any[] = [];
  customers1: Result[];
  //users: User[];

  products = [];
  product: any;
  products1: any[];
  products2: any[];
  clonedProducts: { [s: string]: any; } = {};

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
    private photos: TelegramPictureService,
    private messageService: MessageService,
    private productService: ProductService

  ) { }



  ngOnInit() {

    //
    //this.productService.getProductsSmall().then(data => this.products2 = data);

    

    //
    this.submitted = false;
    this.productDialog = false;
    console.log("Django ngOnInit subscribe getUpdate=====================>");
    this.getUpdate();
    /*
    this.subscription = this.message.getUpdate().subscribe(data => {
      this.product = data['result'];
      //this.products1 = data['result'];
      //this.products.push(JSON.stringify(data));

      //this.data3.push(... data);
      console.log("Django ngOnInit subscribe GetUpdate data ====================================>", data['result']);
      console.log("Django ngOnInit subscribe GetUpdate data Result Data====================================>", data['result']);
      console.log("Django ngOnInit subscribe GetUpdate -->this products====================================>", this.products);
      //this.users.push(data);
      console.log("Django ngOnInit subscribe GetUpdate 5this customers====================================>", this.customers);
      console.log("Django ngOnInit subscribe  GetUpdate 5this customers results [0] ====================================>", this.customers[0]);
      this.loading = false;
    });*/
    this.statuses = [{ label: 'In Stock', value: 'INSTOCK' }, { label: 'Low Stock', value: 'LOWSTOCK' }, { label: 'Out of Stock', value: 'OUTOFSTOCK' }]

    
      this.loading = false;


    




  }

  getUpdate(){
    this.subscription = this.message.getUpdate().subscribe(data => {
      this.product = data['result'];
      //this.products1 = data['result'];
      //this.products.push(JSON.stringify(data));

      //this.data3.push(... data);
      console.log("Django ngOnInit subscribe GetUpdate data ====================================>", data['result']);
      console.log("Django ngOnInit subscribe GetUpdate data Result Data====================================>", data['result']);
      console.log("Django ngOnInit subscribe GetUpdate -->this products====================================>", this.products);
      //this.users.push(data);
      console.log("Django ngOnInit subscribe GetUpdate 5this customers====================================>", this.customers);
      console.log("Django ngOnInit subscribe  GetUpdate 5this customers results [0] ====================================>", this.customers[0]);
      this.loading = false;
    });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    //this.subscription1.unsubscribe();

  }

  /////////////////
  onRowEditInit(book: any) {
    console.log('Row edit initialized', book);
  }

  onRowEditSave(book: any) {
    console.log('Row edit saved: ', book);
  }

  onRowAdd(book: any, index: number) {
    console.log('Row edit index: ', index)
    console.log('Row edit saved: ', book);
    console.log('Row edit saved: ', book.id);
    this.subscription = this.message.addPost(book).subscribe(data => {
      console.log("Add==>:", data)
    });
  }

  onRowEditCancel(book: any, index: number) {
    console.log('Row edit cancelled: ', book, index);
    console.log('Row edit index: ', index)
    console.log('Row edit saved: ', book);
    console.log('Row edit saved: ', book.id);
    this.message.deletePost(book.id).subscribe(data => {
      console.log("Django ngOnInit EditCancel data ====================================>", data)
    });


  }
  onRowEditInit1(product: Product) {
    console.log("Django  onRowEditInit1l data ====================================>", product)
    this.clonedProducts[product.id] = { ...product };
    this.getUpdate();
  }

  onRowEditSave1(product: Product) {
    if (product.salery > 0) {
      this.subscription = this.message.editPost(product, product.id).subscribe(data => {
        console.log("Add==>:", data)
      });
      delete this.clonedProducts[product.id];
      console.log("Save===>", product.id)
      console.log("Product===>", product)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
      this.getUpdate();
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel1(product: Product, index: number) {
    if (product.salery > 0) {
      this.subscription = this.message.deletePost(product.id).subscribe(data => {
        console.log("Delete==>:", data)
        this.getUpdate();
      });
    }

    
    this.products2[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }

  onRowEditAdd1(product: Product) {
    if (product.salery > 0) {
      this.subscription = this.message.addPost(product).subscribe(data => {
        console.log("Add==>:", data)
        this.getUpdate();
      });
      delete this.clonedProducts[product.id];
      console.log("Save===>", product.id)
      console.log("Product===>", product)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }



  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.products ? this.first === (this.products.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.products ? this.first === 0 : true;
  }

}


