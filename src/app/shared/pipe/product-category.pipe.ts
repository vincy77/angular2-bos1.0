import { Pipe, PipeTransform } from '@angular/core';

// 管道分纯管道(Pure Pipe)和非纯管道(Impure Pipe)。默认情况下，管道都是纯的，
// 在自定义管道声明时把pure标志置为false,就是非纯管道。如:
// @Pipe({
//   name: 'sexReform',
//   pure:false
// })
// 纯管道:
//   Angular只有检查到输入值发生纯变更时，才会执行纯管道。纯变更指的是，原始类型值(String,Number,Boolean,Symbol)的改变，或者对象引用的改变(对象值改变不是纯变更，不会执行).
//
// 非纯管道
// Angular会在每个组件的变更检测周期执行非纯管道。所以，如果使用非纯管道，我们就得注意性能问题了。

@Pipe({ name: 'productCategory' })
export class productCategoryPipe implements PipeTransform {
  transform(value: number): string {
    console.log(value);
    console.log(typeof value);
    //if(!value) return value;
    if(typeof value !== 'number') {
      throw new Error('Invalid pipe argument for productCategoryPipe');
    }
    let category;
    switch (value) {
      case 1:
        category = '绿茶';
        break;
      case 2:
        category = '红茶';
        break;
      case 3:
        category = '乌龙茶';
        break;
      case 4:
        category = '黑茶';
        break;
      case 5:
        category = '白茶';
        break;
      case 6:
        category = '黄茶';
        break;
      case 7:
        category = '花茶';
        break;
      case 8:
        category = '药茶';
        break;
      default:
        category = value;
        break;
    }
    return category;
  }
}
