
import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/telegram-result';
import { Subscription } from 'rxjs/internal/Subscription';
import { Representative } from 'src/app/models/customer';
import { DjangoMessageService } from 'src/app/services/django-message.service';
import { Product } from 'src/app/models/product';

import { ConfirmationService, Message, MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';

interface City {
  name: string,
  code: number
}


@Component({
  selector: 'app-django-message',
  templateUrl: './django-message.component5.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./django-message.component5.scss']
})



export class DjangoMessageComponent implements OnInit {

  checked: boolean = true;

  cities: City[];
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
  status: City[];
  cols: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  loadedCharacter: {};

  constructor(
    private message: DjangoMessageService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService

  ) {

  }

  // this.cities=[{name:'motivated', code:'1'}, {name:'unmotivated', code:'0'}];

  ngOnInit() {
    this.submitted = false;
    this.productDialog = false;
    this.getUpdate();
    this.loading = false;
    this.primengConfig.ripple = true;
    this.cities = [{ name: 'HighMotivated', code: 5 }, { name: 'MiddleMotivated', code: 3 }, { name: 'LowMotivated', code: 1 }, { name: 'NotMotivated', code: 0 }];
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'nach_name', header: 'Nachname' },
      { field: 'age', header: 'age' },
      { field: 'salery', header: 'salery' },
      { field: 'code_id', header: 'code id' },
      { field: 'mobile', header: 'mobile' },
      { field: 'is_activate', header: 'active' },
      { field: 'is_motivated', header: 'motivated' },
      { field: 'activity', header: 'activity' }
    ];



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
    console.log("onRowEditSave product ==>:", product)
    if (product.salery > 0) {
      this.subscription = this.message.editPost(product, product.id).subscribe(data => {
        this.showViaService("success", "Edit Employee", " The emloyee " + product.nach_name + " has been edited");
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
        this.showViaService("warn", "Edit Employee", " The employee " + product.nach_name + " has been canceled");
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
        this.showViaService("success", "Add Employee", " The employee " + product.nach_name + " has been added");
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

    this.showViaService("info", "No changes", "Nothing has changed");
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

  showViaService(severity: string, nameService: string, message: string) {
    this.messageService.add({ severity: severity, summary: nameService, detail: message });
  }

  confirm(event: Event, product: Product, index: number) {
    console.log("Confirm ==>:", event)
    this.confirmationService.confirm({
      target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.onRowEditCancel(product, index);
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "You have accepted"
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected"
        });
      }
    });
  }

}


