import { Component, OnInit, Input, Output,ViewChild, EventEmitter, ElementRef, AfterViewInit, ChangeDetectorRef, enableProdMode, HostListener } from '@angular/core';
import { MultipleSelectService } from './multiple-select.service';
enableProdMode();
@Component({
  selector: 'app-multiple-tree',
  template: `
  <ul *dropdownMenu class="dropdown-menu"
    role="menu" aria-labelledby="button-nested">
    <li role="menuitem" dropdown placement="right" container="body" [autoClose]="false" #subDropdown="bs-dropdown"
        *ngFor="let item of list;let i = index">
        <!-- list是对象数组-->
        <ng-container *ngIf="name">
          <ng-container  *ngIf="(item.children && item.children.length <= 0) || (!item.children)">
            <a dropdownToggle class="dropdown-item dropdown-show">
              <input *ngIf="multiple" type="checkbox" name="multipleSelect" 
              class="dropdown-show"
              [checked]="item.isSelected" (click)="selected(item,i, $event)">
              {{item[name]}}
            </a>
          </ng-container>
          <ng-container *ngIf="item.children && item.children.length > 0">
            <a dropdownToggle class="dropdown-item dropdown-toggle dropdown-show" 
            [ngClass]="{'toggle-active': subDropdown.isOpen}"
            (click)="openAndClose(subDropdown,$event,item)">
              {{item[name]}}{{subDropdown.isOpen}}
            </a>
            <app-multiple-tree #ccc [selectedList]="selectedList" [name]="name" (active)="activeEvent($event, item)" [list]="item.children" [multiple]="multiple"></app-multiple-tree>
          </ng-container>
        </ng-container>
        <!-- list单项是数组-->
        <!--<ng-container *ngIf="!name">-->
          <!--<a dropdownToggle class="dropdown-item dropdown-show">-->
              <!--<input *ngIf="multiple" type="checkbox" -->
              <!--class="dropdown-show"-->
              <!--name="multipleSelect" (click)="selected(item,i, $event)">-->
              <!--{{item}}-->
            <!--</a>-->
        <!--</ng-container>-->
    </li>
  </ul>
`,
  styleUrls: ['multiple-select.component.scss']
})
export class MultipleTreeComponent implements OnInit, AfterViewInit {
  /**
   * 接收的原始数据
   * */
  @Input() list = [];
  /**
   * 是否是多选
   * */
  @Input() multiple = false;
  /**
   * 是否是对象数组
   * */
  @Input() name = 'name';
  /**
   * 向父组件发射子组件选中的数据（包含父组件传递下去的数据）
   * */
  @Output() active = new EventEmitter(true);
  /**
   * 选中的选项数组（需传递给子组件）
   * */
  @Input() selectedList = [];
  /**
   * 上一个展开的组件
   * */
  oldTemplate;
  constructor(
    private service: MultipleSelectService,
    private el: ElementRef,
    // private cd: ChangeDetectorRef
  ) { }
  /**
   * 除了点击下拉框，点击其他区域 下拉框关闭
   * */
  @HostListener('document:click', ['$event']) onClick(btn: Event) {
    let className = event.target['className'];
    if(className.indexOf('dropdown-show') < 0){
      this.service.hideEventEmit.emit();
    }
  }
  /**
   * 接收子组件传递的选中选项，修改所有tree组件selectedList的值
   * */
  activeEvent(event, item){
    console.log(event); //emit(data)传入的数据data
    // console.log(item); //(active)="activeEvent($event, item)"传入的item(父组件item)
    // let data = {
    //   item: item,
    //   list: event.list//.concat(event.list)
    // };
    console.log(this.selectedList)// 为什么
    this.selectedList = event;// 重新给当前的component赋值
    this.active.emit(event);
    // this.cd.detectChanges();
  }
  /**
   * 选中／取消checkbox
   * */
  selected(item,index,event){
    console.log(index)
    if(this.multiple){
      item.isSelected = !item.isSelected;
      console.log(this.selectedList);
      console.log(this.selectedList.length);
      console.log(item);
      if(item.isSelected){
        //改变子组件中selectedList的值，父组件中的也会改变（原因：数组是引用类型，指向同一地址）
        //this.selectedList.push(item);
        // concat返回新数组(父组件中的值不会跟着改变)
        this.selectedList = this.selectedList.concat([item]);
      }else{
        // if(this.name){
          // 返回的是新数组(地址指向已经改变)，原数组不变
          this.selectedList = this.selectedList.filter(i => {
            return item._id != i._id;
          });
          // this.selectedList.splice(2,1)
          // lst.push({categoryId:1,categoryName:2})
        // } else{
        //   this.selectedList = this.selectedList.filter(i => {
        //     return item != i;
        //   })
        // }
      }
    } else{
      this.selectedList = [item];
    }
    let data = {
      item: item,
      list: this.selectedList // 当前component选中的list
    };
    this.active.emit(this.selectedList)
    // this.cd.detectChanges();
  }
  /**
   * 展开／收起下拉框
   * */
  openAndClose(template,event,item){
    // 每个template都是一个组件，数据之间不冲突
    console.log(template)
    console.log(template['isOpen'])
    if(this.oldTemplate){
      console.log(this.oldTemplate.isOpen)
      this.oldTemplate.hide();
      this.oldTemplate = template;
    }
    if(!this.oldTemplate){
      this.oldTemplate = template;
    }
  }

  ngAfterViewInit(){
    //this.cd.detectChanges();
  }
  ngOnInit() {
    //this.cd.detectChanges();
    console.log(this.name)
    console.log(this.list)

  }

}
