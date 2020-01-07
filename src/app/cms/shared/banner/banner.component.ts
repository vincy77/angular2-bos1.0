import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cms-banner',
  templateUrl: 'banner.component.html',
  styleUrls: ['banner.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => CMSBannerComponent),
  //     multi: true
  //   }
  // ]
})
export class CMSBannerComponent { //implements ControlValueAccessor
  @Input() data;
  @Input() index: number;
  @Input() placeholder: string;
  @Input() form;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  indexData = {
    mainAct: [{},{}]
  }
  // @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  //dataChange = (_: any) => { };
  //public changeFn: Function = () => {};
  constructor() {}
  // get value(): any {
  //   console.log(this.data);
  //   console.log(this.index);
  //   return this.data;
  // };
  //
  // set value(v: any) {
  //   if (v !== this.data) {
  //     this.data = v;
  //     this.changeFn(v);
  //   }
  // }
  // //writeValue(obj: any)：该方法用于将模型中的新值写入视图或 DOM 属性中。
  // writeValue(value: any) {
  //   if (value && value !== this.data) {
  //     this.data = value;
  //   }
  // }
  //
  // // registerOnChange(fn: any)：设置当控件接收到 change 事件后，调用的函数
  // registerOnChange(fn: any) {
  //   this.changeFn = fn;
  // }
  //
  // // registerOnTouched(fn: any)：设置当控件接收到 touched 事件后，调用的函数
  // registerOnTouched(fn: any) {
  //   //
  // }
  //
  // // setDisabledState?(isDisabled: boolean)：当控件状态变成 DISABLED
  // // 或从 DISABLED 状态变化成 ENABLE 状态时，会调用该函数。该函数会根据参数值，启用或禁用指定的 DOM 元素。
  // setDisabledState(isDisabled: boolean) {
  //
  // }
}
