import { GPIOService } from './../../services/gpio.services';
import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as io from 'socket.io-client'
import { identifierModuleUrl } from '@angular/compiler';

//const myWebSocket  = webSocket("ws://192.168.1.5:8080/socket.io/?EIO=3&transport=websocket");

@Component({
  selector: 'app-gpio',
  templateUrl: './gpio.component.html',
  styleUrls: ['./gpio.component.css']
})
export class GpioComponent implements OnInit {

  public socket;

  text: string;


  constructor(private service: GPIOService) {




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
