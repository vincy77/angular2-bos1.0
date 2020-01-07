import {
  Component, Injectable, OnInit, ViewChild, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy, Input, Output, TemplateRef
} from '@angular/core';
//import { Resolve } from '@angular/'
import { MyAlertComponent } from '../core/my-alert/my-alert.component';


@Injectable()
export class MyAlertService {
  componentRef: ComponentRef<MyAlertComponent>;
  @ViewChild('', { read: ViewContainerRef })
  container: ViewContainerRef;
  constructor(
    private resolver: ComponentFactoryResolver,
    //private templateRef:TemplateRef<any>,
    //private viewContainer:ViewContainerRef
  ) {}
  template;
  // 在appComponent中调用该方法初始化 template模版（是否有别的方法，该服务中无法获取组件中设置的模版变量）
  getTemplate(temp) {
    this.template = temp;
  }
  // 成功信息弹出窗
  successMsg(message: string) {
    this.createComponent(message, 'success');
    this.closeDialog();
  }
  // 警告信息弹出窗
  warnMsg(message: string) {
    this.createComponent(message, 'warn');
    this.closeDialog();
  }
  // 失败信息弹出窗
  errorMsg(message: string) {
    this.createComponent(message, 'error');
    this.closeDialog();
  }
  // 确认框
  confirmDialog(message: string, fun) {
    this.createComponent(message, 'confirm');
    console.log(this.componentRef)
    console.log(this.componentRef.instance.outputConfirm);
    this.componentRef.instance.outputConfirm.subscribe(
      (msg: string) => {
        console.log(msg);
        this.ngOnDestroy();
        fun();
        return msg;
      }
    );
    this.closeDialog();
  }
  // 动态插入信息弹出窗
  createComponent(message: string, type: string) {
    this.container = this.template;
    console.log(this.container);
    this.container.clear();
    const factory: ComponentFactory<MyAlertComponent> =
      this.resolver.resolveComponentFactory(MyAlertComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.type = type;
    this.componentRef.instance.message = message;
  }
  // 销毁动态插入的组件（dialog）
  ngOnDestroy() {
    this.componentRef.destroy()
  }
  // 提示框确认按钮和确认框取消按钮点击事件
  closeDialog() {
    this.componentRef.instance.outputDecline.subscribe(
      (msg: string) => {
        console.log(msg);
        this.ngOnDestroy();
        return msg;
      }
    );
  }
}
