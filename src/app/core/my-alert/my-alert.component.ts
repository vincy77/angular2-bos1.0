import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "my-alert",
  templateUrl: './my-alert.component.html',
  styleUrls: ['my-alert.component.less'],
})
export class MyAlertComponent implements OnInit{
  @Input() type: string = '';
  @Input() message: string = '';
  @Output() output = new EventEmitter();


  currentClass = '';

  ngOnInit() {
    this.currentClass = this.type;
    console.log(this.type);
  }
}
