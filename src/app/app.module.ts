
import { EditStockComponent } from './components/edit-stock/edit-stock.component';
import { DetailsStockComponent } from './components/details-stock/details-stock.component';

import { DetailsOverviewComponent } from './components/details-overview/details-overview.component';
import { OverviewService } from './services/overview.service ';
import { AddInvestComponent } from './components/add-invest/add-invest.component';
import { InvestService } from './services/invest.service';
import { FormsModule } from '@angular/Forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
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
import { EditOverviewComponent } from './components/edit-overview/edit-overview.component';
import { OverviewsComponent } from './components/overviews/overviews.component';
import { AddOverviewComponent } from './components/add-overview/add-overview.component';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData, DatePipe, CommonModule } from '@angular/common';
import { FormatDateService } from './services/format-date.service';
import { GpioComponent } from './components/gpio/gpio.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { EditInvestComponent } from './components/edit-invest/edit-invest.component';
import { BrowserModule } from '@angular/platform-browser';

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
    NavbarComponent,
    DashboardComponent,
    ClientsComponent,
    SidebarComponent,
    EditClientComponent,
    EditOverviewComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent,
    OverviewsComponent,
    LineChartComponent,
    DetailsStockComponent,
    EditStockComponent,
    EditInvestComponent,
    GpioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'clientpanel'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgSelectModule,
    CommonModule,
    ChartsModule

 
  ],
  providers: [ClientService,AuthService,InvestService,StockService,OverviewService,FormatDateService,DatePipe],
  bootstrap: [AppComponent]
})




export class AppModule { }
