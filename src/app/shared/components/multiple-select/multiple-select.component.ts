import { Component, OnInit, Input,Output, AfterViewInit,OnDestroy, ElementRef, EventEmitter, ViewChild, AfterViewChecked, DoCheck, ViewChildren, HostListener, QueryList } from '@angular/core';
import { MultipleSelectService } from './multiple-select.service';

@Component({
  selector: 'app-multiple-select',
  templateUrl: 'multiple-select.component.html',
  styleUrls: ['multiple-select.component.scss']
})
export class MultipleSelectComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, DoCheck {
  /**
   * 接收的原始数据
   * */
  @Input() private list = [];
  /**
   * 是否是多选
   * */
  @Input() multiple = false;
  /**
   * 只支持对象数组
   * */
  @Input() name = 'name';
  @Input() option;
  @Output() optionChange = new EventEmitter();
  /**
   * 订阅事件
   * */
  subscript;
  /**
   * 选中的选项数组
   * */
  selectedList =[];
  /**
   * 显示的数据
   * */
  selectedData = '请选择';
  @ViewChild('dropdown') child;

  constructor(
    private service: MultipleSelectService,
    private el: ElementRef
  ) {}
  /**
   * 显处理示选中的数据
   * */
  activeEvent(data){
    console.log('aaaaapppppppppppppppppppp')
    console.log(data)
    let that = this;
    let allItem = data;//this.service.getSelectedData();
    console.log(allItem);
    if(this.multiple){
      that.selectedData = '';
      allItem.forEach(item => {
        if(that.selectedData){
          that.selectedData = that.name ? (that.selectedData + ',' + item[that.name]) : (that.selectedData + ',' + item);
        }else{
          that.selectedData = that.name ? item[that.name] : item;
        }
      });
    }else{
      that.selectedData = that.name ? data[that.name] : data;
    }
    console.log(that.selectedData)
    this.option = allItem;
    this.optionChange.emit(this.option);
  }
  /**
   * 点击下拉框的input触发的事件
   * 1、订阅下拉框关闭事件，点击的是另一个select的话， 关闭之前的select，并取消订阅之前的下拉框
   * */
  openAndClose(template){
    let that = this;
    let oldTemplate = this.service.getOldTemplate();
    if(oldTemplate){
      oldTemplate.hide();
      this.service.setOldTemplate(template)
    }else{
      this.service.setOldTemplate(template);
    }
    this.subscript = this.service.hideEventEmit.subscribe(res => {
      that.child.hide();
      that.subscript.unsubscribe(); // 取消订阅
    })
    console.log(this.selectedData)
    // this.initSelectedData();
  }
  /**
   * 默认选中项
   * */
  initSelectedData(lst){
    let that = this;
    console.log(lst)
    lst.forEach(item => {
      if(item.isSelected){
        that.selectedList.push(item);
      }
      if(item.children && item.children.length > 0){
        that.initSelectedData(item.children);
      }
    })
    console.log(this.selectedList)
    if(this.selectedList.length > 0){
      this.activeEvent(this.selectedList);
    }
  }
  ngOnInit() {
    let that = this;
    // if(this.name){
    //   this.initSelectedData(this.list);
    // }

  }
  ngDoCheck(){
    // 父页面使用同一份数据的时候，数据之间会互相影响问题？？？？？
    // if(this.list && !this.unsubscribe){
    //   this.service.changeListEventEmit.emit();
    // }
  }
  ngAfterViewInit(){}
  initData = true;
  /**
   * list数据有些是接口返回的，数据接收有延迟
   * 1、判断有数据的时候，初始化默认选项
   * */
  ngAfterViewChecked(){
    if(this.list.length > 0 && this.initData){
      console.log('initintiiniiiiii')
      this.initSelectedData(this.list);
      this.initData = false;
    }
  }
  ngOnDestroy() {

  }

}
