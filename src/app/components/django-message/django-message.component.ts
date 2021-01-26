
import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/telegram-result';
import { Subscription } from 'rxjs/internal/Subscription';
import { Representative } from 'src/app/models/customer';
import { DjangoMessageService } from 'src/app/services/django-message.service';
import { Product } from 'src/app/models/product';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-django-message',
  templateUrl: './django-message.component4.html',
  providers: [MessageService],
  styleUrls: ['./django-message.component.css']
})


export class DjangoMessageComponent implements OnInit {

  msgs1: Message[];
  msgs2: Message[];
  productDialog: boolean;
  submitted: boolean;

  text: any;
  data1: [];
  data2: any[];
  data3: Result[];
  first = 0;
  rows = 10;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  subscription: Subscription;
  subscription1: Subscription;
  imagePath: any;
  id11: string;
  selectedEmployee: string;
  mySelection: string;
  public tableData: any;
  public rowGroupMetadata: any;
  public selectedRow: any;
  selectedRows = [];
  customers: any[] = [];
  customers1: Result[];
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
    private message: DjangoMessageService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig

  ) { }



  ngOnInit() {
    this.submitted = false;
    this.productDialog = false;
    this.getUpdate();
    this.loading = false;
    this.primengConfig.ripple = true;
  }

  getUpdate() {
    this.subscription = this.message.getUpdate().subscribe(data => {
      this.product = data['result'];
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = { ...product };
    this.getUpdate();
  }

  onRowEditSave(product: Product) {
    if (product.salery > 0) {
      this.subscription = this.message.editPost(product, product.id).subscribe(data => {
        console.log("onRowEditSave ==>:", data)
        this.showViaService("Edit Employee", " The emloyee " + product.nach_name + " has been edited");
      });
      delete this.clonedProducts[product.id];
      this.clearMessages();
      this.getUpdate();
    }
    else {
      //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(product: Product, index: number) {
    if (product.salery > 0) {
      this.subscription = this.message.deletePost(product.id).subscribe(data => {
        console.log("DonRowEditCancel==>:", data)
        this.showViaService("Edit Employee", " The employee " + product.nach_name + " has been canceled");
        this.clearMessages();
        this.getUpdate();
      });
    }


    this.products2[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }

  onRowEditAdd(product: Product) {
    if (product.salery > 0) {
      this.subscription = this.message.addPost(product).subscribe(data => {
        this.showViaService("Add Employee", " The employee " + product.nach_name + " has been added");
        this.clearMessages();
        this.getUpdate();
      });
      delete this.clonedProducts[product.id];
    }
    else {
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }


  onRowEditMessage() {

    this.showViaService("No changes", "Nothing has changed");
    this.clearMessages();

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

  clearMessages() {
    setTimeout(() => {
      this.messageService.clear();
    }, 3000);
  }

  showViaService(nameService: string, message: string) {
    this.messageService.add({ severity: 'success', summary: nameService, detail: message });
  }

}


