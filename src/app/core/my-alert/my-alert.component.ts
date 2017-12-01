import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "my-alert",
  templateUrl: './my-alert.component.html',
  styleUrls: ['my-alert.component.less'],
})
export class MyAlertComponent implements OnInit{
  @Input() type: string = '';
  @Input() message: string = '';
  @Output() outputConfirm = new EventEmitter();
  @Output() outputDecline = new EventEmitter();


  currentClass = '';

  confirm() {
    event.stopPropagation();
    this.outputConfirm.next(event);
  }
  decline(event: any) {
    event.stopPropagation();
    this.outputDecline.next(event);
  }
  // onClick(event: any) {
  //   event.stopPropagation();
  //   this.outputConfirm.next(event);
  // }


  ngOnInit() {
    this.currentClass = this.type;
    console.log(this.type);
  }
}
