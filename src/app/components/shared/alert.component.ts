import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
  selector:'alert-app',
  templateUrl:'./alert.component.html',
  styleUrls:['./alert.component.css']
})

export class AlertComponent{

  @Input() message:string;
  @Output() close = new EventEmitter<void>();
  onClose(){
    this.close.emit();
     console.log("--------------------------------error message", this.message)
  }
  

  

}