import { OverviewService } from './../../services/overview.service ';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Invest } from './../../models/invest';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { InvestService } from '../..//services/invest.service';
import { DatePipe } from '@angular/common';
import { Overview } from 'src/app/models/overview';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit {
  invest: Invest[];
  investDate = [];
  overview:Overview[];
  overviewDate = [];
  depot = [];
  investAmount = [];
  totalInvest = [];
  stringArr = [];
  investAddAmount: Number;
  n: number;
  test: any;
  invAmount: number[];
  js: JSON;
  test2: any[] = [{ data: [] }];
  public barChartData: any[] = [];
  test6 = [];
  test5: ChartDataSets[]


  constructor(
    private investService: InvestService,
    private overviewService: OverviewService
  ) { }

  ngOnInit(): void {
    // Investment
    this.investService.getInvests().subscribe(
      cl => {
        this.invest = cl;
        this.invest.map(data => {
          var datePipe = new DatePipe('de-DE');
          datePipe.transform(data.date.toDate(), 'dd.MM.yyyy');
          console.log("new date1", datePipe);
          this.investDate.push(datePipe.transform(data.date.toDate(), 'dd.MM.yyyy'))

        });
        this.investAmount = this.invest.map(data => data.amount);
        this.investAddAmount = this.invest.reduce((acc, am) =>
          acc + am.amount, 0);

        console.log("investAddAmount:", this.investAddAmount);
        //return accumulator + currentValue;


        console.log("investDate:", this.investDate);
        console.log("investAmount:", this.investAmount);

      });

      // Depot
      this.overviewService.getOverviews().subscribe(
        cl => {
          this.overview = cl;
          //this.investDate = this.invest.map(data => data.date);
          this.overview.map(data => {
            var datePipe = new DatePipe('de-DE');
            datePipe.transform(data.date.toDate(), 'dd.MM.yyyy');
            console.log("new date3", datePipe);
            //console.log("new date2", datePipe.transform(data.date.toDate(), 'dd.MM.yyyy'));
            this.overviewDate.push(datePipe.transform(data.date.toDate(), 'dd.MM.yyyy'))
  
          });
          this.depot = this.overview.map(data => data.cash + data.depot);
        
          console.log("Depot date:", this.overviewDate);
          console.log("Depot:", this.depot);
  
        });
  

    setTimeout(() => this.onInvestment(), 1000);
    setTimeout(() => this.newArray(), 1000);




  }
  /*
    formatDate(){
      var datePipe = new DatePipe('de-DE');
      this.myDate = datePipe.transform(this.overview.date.toDate(), 'dd.MM.yyyy');
      console.log ("MyDate",this.myDate);
    }*/


  lineChartData: ChartDataSets[] = [
    //{ data: [71, 72, 74, 75, 76, 0], label: 'investments' },
    {
      data: [],

      label: ''
    },



  ];

  
  //lineChartData1: Datapoints[]=[];


  lineChartLabels: Label[] = [];
  lineChartLabels1: Label[] = [];

  /*
  lineChartLabels: ChartDataSets[] = [
    //{ data: [71, 72, 74, 75, 76, 0], label: 'investments' },
    {
      data: [],

      label: ''
    },



  ];*/
  

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  markerType: "square";



  newArray() {
    var x = 0;
    this.investAmount.forEach(n => {

      console.log("x", x);
      console.log("n", n);
      console.log("x = n + x", x = n + x);
      this.totalInvest.push(x);
      console.log("totalInvest", this.totalInvest);
    }

    )
  }

  /*
 
  this.lineChartData = [
      { data: y, label: 'Aufgenommener Kredit' }, { data: z1, label: 'Gesamttilgung' }]
    //{ data: [8.009166666666667, 12, 78, 7, 0.7, 75], label: 'Crude oil prices' }],*/

  onInvestment() {

    this.lineChartData = [
      //{ data: this.barChartData, label: 'Investment' }, { data: this.test2, label: 'Gesamttilgung' }]
      { data: this.totalInvest, label: 'Investment' },
      { data: this.depot, label: 'Money in depot' }];
    console.log("invetsDate:", this.investDate);
    console.log("Current Depot and Cash :", this.depot);
    console.log("invetsAmount:", this.investAmount);
    console.log("totalInvest:", this.totalInvest);
    this.lineChartLabels= this.overviewDate;
   // this.lineChartLabels =[["18.03.2020,''"],["'',12.05.2020"],["12.05.2020,16.05.2020"],["12.05.2020,17.05.2020"],["01.07.2020,17.05.2020"]];
    //this.lineChartLabels =[["18.03.2020,''"],["'',12.05.2020"],["12.05.2020,16.05.2020"],["12.05.2020,17.05.2020"],["01.07.2020,17.05.2020"]];
    //this.lineChartLabels[1] = this.overviewDate;
    //this.lineChartLabels[0] = this.overviewDate;

    
    /*this.lineChartLabels = [
      //{ data: this.barChartData, label: 'Investment' }, { data: this.test2, label: 'Gesamttilgung' }]
      { data: this.investDate, label: 'Invest' },
      { data: this.overviewDate, label: 'Overview' }];*/
    
    

  }
}
