import { DjangoMessageService } from 'src/app/services/django-message.service';
import { TelegramMessageService } from './services/telegram-message.service';
import { TelegramMessageComponent } from './components/telegram-message/telegram-message.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InfoStockService } from './services/info-stock.service';
import { EditStockComponent } from './components/edit-stock/edit-stock.component';
import { DetailsStockComponent } from './components/details-stock/details-stock.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsOverviewComponent } from './components/details-overview/details-overview.component';
import { OverviewService } from './services/overview.service ';
import { AddInvestComponent } from './components/add-invest/add-invest.component';
import { InvestService } from './services/invest.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';;
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AddClientComponent } from './components/add-client/add-client.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { StockService } from './services/stock.service';
import { InvestsComponent } from './components/invests/invests.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { OverviewsComponent } from './components/overviews/overviews.component';
import { AddOverviewComponent } from './components/add-overview/add-overview.component';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData, DatePipe, CommonModule } from '@angular/common';
import { FormatDateService } from './services/format-date.service';
import { GpioComponent } from './components/gpio/gpio.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { EditInvestComponent } from './components/edit-invest/edit-invest.component';
import { BrowserModule } from '@angular/platform-browser';
import { DetailsInvestComponent } from './components/details-invest/details-invest.component';
import { EditOverviewComponent } from './components/edit-overview/edit-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoStockComponent } from './components/info-stock/info-stock.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import { CustomerService } from './services/customerservice';
import { TableModule } from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import { InputTextModule} from 'primeng/inputtext';
import { DjangoMessageComponent } from './components/django-message/django-message.component';
import { ProductService } from './services/productservice';


registerLocaleData(localeDe);


@NgModule({
  declarations: [
    AddOverviewComponent,
    DetailsClientComponent,
    OverviewsComponent,
    DetailsOverviewComponent,
    AppComponent,
    StocksComponent,
    AddStockComponent,
    AddClientComponent,
    AddInvestComponent,
    InvestsComponent,
    DetailsInvestComponent,
    NavbarComponent,
    DashboardComponent,
    ClientsComponent,
    SidebarComponent,
    EditClientComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent,
    OverviewsComponent,
    EditOverviewComponent,
    LineChartComponent,
    DetailsStockComponent,
    EditStockComponent,
    EditInvestComponent,
    GpioComponent,
    InfoStockComponent,
    TelegramMessageComponent,
    DjangoMessageComponent

  ],
  imports: [
    FormsModule ,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'clientpanel'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgSelectModule,
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    MultiSelectModule,
    AccordionModule,
    ButtonModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    CommonModule,
    FormsModule


  ],
  providers: [ClientService,AuthService,InvestService,StockService,OverviewService,FormatDateService,DatePipe,InfoStockService,TelegramMessageService,CustomerService,DjangoMessageService,ProductService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})




export class AppModule { }
