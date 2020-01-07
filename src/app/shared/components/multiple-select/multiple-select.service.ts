import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MultipleSelectService {
  public selectedItemEventEmit: EventEmitter<any>;
  public changeListEventEmit: EventEmitter<any>;
  public hideEventEmit: EventEmitter<any>;

  private selectedData = [];
  private template;

  constructor() {
    this.selectedItemEventEmit = new EventEmitter();
    this.changeListEventEmit = new EventEmitter();
    this.hideEventEmit = new EventEmitter();


  }
  setOldTemplate(temp){
    this.template = temp;
  }
  getOldTemplate(){
    return this.template;
  }
  getSelectedData(){
    return this.selectedData;
  }
  setSelectedData(item){
    this.selectedData.push(item)
  }
  resetSelectedData(item){
    this.selectedData = [item];
  }
  removeSelectedData(item){
    this.selectedData = this.selectedData.filter(i => {
      return item.categoryId != i.categoryId;
    });
  }
  removeListSelectedData(item){
    this.selectedData = this.selectedData.filter(i => {
      return item != i;
    });
  }
}
