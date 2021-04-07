import { ignoreElements } from 'rxjs/operators';
import { From } from './telegram-from';
import { Photo } from './telegram-photo';

export class DjangoSalesman {

  public name: string;
  public price: number;
  public result: [];


  constructor(init?) {

    if (init) {
      console.log("Call Konstruktor => DjangoMessage");
      console.log("Call Konstruktor => DjangoMessage=> name", init['results'][0]);
      console.log("Call Konstruktor => DjangoMessage=> name", init['results']);
      console.log("Call Konstruktor => DjangoMessage=> name", init['results'][0]['name']);
      //this.name= new DjangoMessage(init['name']);  //this.message = new Message(init["message"], false);
      //console.log("Konstruktor Name", init['results'].name);
      //console.log("Konstruktor Nachname", init['results']['nach_name']);
      /*
     this.nach_name = init['nach_name'];
     this.age = init['results'][0]['age'];
      this.salery = init['results'][0]['salery'];
      this.code_id = init['results'][0]['code_id'];
      this.mobile = init['results'][0]['mobile'];
      this.is_activate = init['results'][0]['is_activate'];
      this.is_motivated = init['results'][0]['is_motivated'];*/
      this.result = init['results'];
      //  this.message = new Message(init["edited_message"], true);

    }
  }
}
