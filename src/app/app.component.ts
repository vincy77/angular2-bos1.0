import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { MyAlertService } from './core/my-alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // 设置一个全局模版变量，用于公用alert插入组件
  @ViewChild("appContent", { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(
    private myAlertService: MyAlertService
  ) {}

  ngAfterViewInit(){
    this.myAlertService.getTemplate(this.container);
  }
}
