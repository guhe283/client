import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common'


@Injectable({
  providedIn: 'root'
})

export class FormatDateService {
  constructor(public datePipe: DatePipe) { }


  public getFormatedDate(date: any) {

    // replace . with /
    var myDate = date.split(".");
    console.log("Data after split", myDate)
    var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
    console.log("Data after split-2 ", myDate)
    date = new Date(newDate).getTime();
    date = new Date(date);
    var dateAdded = new Date(date);
    var fTimestamp = firebase.firestore.Timestamp.fromDate(dateAdded);
    return fTimestamp;

  }

}