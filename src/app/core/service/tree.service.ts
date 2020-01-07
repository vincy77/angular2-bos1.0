import { Injectable } from '@angular/core';

@Injectable()
export class TreeService {

  parentId;
  objectId;
  constructor() { }
  /**
   * 分类数据处理（tree结构）
   * */
  changeCategoryList(showList,parentId,objectId,defaultId, spreadData?){
    let that = this;
    that.parentId = parentId;
    that.objectId = objectId;
    let list1 = [];
    let list2 = [];
    showList.forEach(item => {
      Object.assign(item,{isOpen: false, children: []}, spreadData);
      if(item[parentId] == defaultId){
        list1.push(item);
      }else{
        list2.push(item);
      }
    });
    this.setNavTree(list1,list2);
    return list1;
  }
  setNavTree(list1,list2){
    let that = this;
    list1.forEach(item => {
      let list = [];
      list2.forEach(i => {
        if(item[that.objectId] == i[that.parentId]){
          item.children.push(i);
        }else{
          list.push(i);
        }
      });
      if(list.length > 0 && item.children.length > 0){
        that.setNavTree(item.children,list);
      }
    });
  }
}
