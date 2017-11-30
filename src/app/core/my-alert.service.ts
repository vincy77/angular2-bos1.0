import {
  Component, Injectable, OnInit, ViewChild, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy, Input, Output
} from '@angular/core';
import { MyAlertComponent } from '../core/my-alert/my-alert.component';


@Injectable()
export class MyAlertService {
  componentRef: ComponentRef<MyAlertComponent>;
  @ViewChild('', { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(
    private resolver: ComponentFactoryResolver
  ) {}
  template;
  getTemplate(temp) {
    this.template = temp;
  }
  success(message: string) {
    this.createComponent(message, 'success');
  }
  warn(message: string) {
    this.createComponent(message, 'warn');
  }
  error(message: string) {
    this.createComponent(message, 'error');
  }
  createComponent(message: string, type: string) {
    this.container = this.template;
    console.log(this.container);
    this.container.clear();
    const factory: ComponentFactory<MyAlertComponent> =
      this.resolver.resolveComponentFactory(MyAlertComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.type = type;
    this.componentRef.instance.message = message;
    this.componentRef.instance.output.subscribe(
      (msg: string) => {
        console.log(msg);
        this.ngOnDestroy();
      }
    );
  }
  ngOnDestroy() {
    this.componentRef.destroy()
  }

}
