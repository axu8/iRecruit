import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss'],
})
export class KeypadComponent implements OnInit {

  @Input() pagetitle: String = "Enter Pin";

  pin:string= "";

  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  emitEvent() {
    this.change.emit(this.pin);
  }

  handleInput(pin: string) {
    if (pin === "clear") {
      this.pin = "";
      return;
    }

    if (this.pin.length === 4) {
      return;
    }
    this.pin += pin;
  }

  ngOnInit() {}

}

 
