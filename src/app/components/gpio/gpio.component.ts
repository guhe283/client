import { GPIOService } from './../../services/gpio.services';
import { Component, OnInit } from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import * as io from 'socket.io-client';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/services/country.service';



//const myWebSocket  = webSocket("ws://192.168.1.5:8080/socket.io/?EIO=3&transport=websocket");


@Component({
  selector: 'app-gpio',
  templateUrl: './gpio.component.html',
  styleUrls: ['./gpio.component.css'],
  providers: [CountryService]
})


export class GpioComponent implements OnInit {


  public socket;
  text: string;

  ///
  selectedCities: string[] = [];

  selectedCountries1: string[] = [];

  selectedCountries2: string[] = [];

  items: SelectItem[];

  item: string;

  cities: any[];

  countries: any[];


  constructor(private service: GPIOService, private countryService: CountryService) {

    this.items = [];

    this.countryService.getCountries().then(countries => {
      this.items = countries;
    });

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];


    console.log("cities1===>", this.cities);
    console.log("countries===>", this.countries);

  }

  ngOnInit(): void {
    this.text = "http://192.168.1.5:8080";

    this.socket = io.connect('http://192.168.1.5:8080');

  }

  setLedOn() {

    console.log("My IP-Adress:", this.text)
    this.socket = io.connect(this.text);


    //var io = require('../lib/socket.io');
    //var socket = io.connect('http://192.168.1.5:8080'); //load socket.io-client and connect to the host
    this.socket.emit("state", 1); //send button state to server
  }


  setLedOff() {

    console.log("My IP-Adress:", this.text)
    this.socket = io.connect(this.text);

    this.socket.emit("state", 0); //send button state to server



  }


}
