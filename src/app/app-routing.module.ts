import { GpioComponent } from './components/gpio/gpio.component';
import { EditOverviewComponent } from './components/edit-overview/edit-overview.component';
import { DetailsOverviewComponent } from './components/details-overview/details-overview.component';
import { AuthGuard } from './components/guards/auth.guard';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { InvestsComponent } from './components/invests/invests.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AddClientComponent} from './components/add-client/add-client.component';
import { AddStockComponent} from './components/add-stock/add-stock.component';
import { AddInvestComponent} from './components/add-invest/add-invest.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { OverviewsComponent} from './components/overviews/overviews.component';
import { AddOverviewComponent } from './components/add-overview/add-overview.component';
import { DetailsStockComponent } from './components/details-stock/details-stock.component';
import { EditStockComponent } from './components/edit-stock/edit-stock.component';




const routes: Routes = [
  {path:'',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'linechart',component:LineChartComponent},
  {path:'register',component:RegisterComponent},
  {path:'invests',component:InvestsComponent},
  {path:'gpio',component:GpioComponent},
  {path:'client/add',component:AddClientComponent,canActivate:[AuthGuard]},
  {path:'invest/add',component:AddInvestComponent,canActivate:[AuthGuard]},
  {path:'client/:id',component:DetailsClientComponent,canActivate:[AuthGuard]},
  {path:'client/edit/:id',component:EditClientComponent,canActivate:[AuthGuard]},
  {path:'settings',component:SettingsComponent,canActivate:[AuthGuard]},
  {path:'overview',component:OverviewsComponent,canActivate:[AuthGuard]},
  {path:'overview/add',component:AddOverviewComponent,canActivate:[AuthGuard]},
  {path:'overview/:id',component:DetailsOverviewComponent,canActivate:[AuthGuard]},
  {path:'overview/edit/:id',component:EditOverviewComponent,canActivate:[AuthGuard]},
  {path:'stock/:id',component:DetailsStockComponent,canActivate:[AuthGuard]},
  {path:'stock',component:StocksComponent},
  {path:'stock/add',component:AddStockComponent,canActivate:[AuthGuard]},
  {path:'stock/edit/:id',component:EditStockComponent,canActivate:[AuthGuard]},
  {path:'**',component:NotFoundComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]

})
export class AppRoutingModule { }
