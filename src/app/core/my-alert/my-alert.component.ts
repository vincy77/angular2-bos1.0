import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "my-alert",
  templateUrl: './my-alert.component.html',
  styleUrls: ['my-alert.component.scss'],
  providers: []
})
export class MyAlertComponent implements OnInit{
  @Input() type: string = '';
  @Input() message: string = '';
  // 子组件暴露一个 EventEmitter 属性，当事件发生时，子组件利用该属性 emits(向上弹射)事件。
  // 父组件绑定到这个事件属性，并在事件发生时作出回应。
  @Output() outputConfirm = new EventEmitter();
  @Output() outputDecline = new EventEmitter();


  currentClass = '';

  confirm() {
    event.stopPropagation();
    this.outputConfirm.emit(event);
  }
  decline(event: any) {
    event.stopPropagation();
    this.outputDecline.emit(event);
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
