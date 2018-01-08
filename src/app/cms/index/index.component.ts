import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Product } from '../shared/product';
import { MyAlertService } from '../../core/my-alert.service';
import { ProductService } from '../shared/product.service';


@Component({
  selector: 'cms-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.less']
})
export class CMSIndexComponent implements OnInit {
  //除了使用了变量赋值的方式初始化组件，还可以使用构造函数constructor()来声明和初始化属性
  user: FormGroup;
  productData = new Product('', '', '', '', 100);
  submitted = false;
  indexData:any = {
    indexBanner: [{img: '', url: '11'},{img: '', url: '22'}],
    mainAct: [{},{},{},{}],
    otherModule: [{type: 'hotAct', bannerImg: '', bannerUrl: '', products: [{productUrl: ''}]}]
  };
  newModule = [
    {key: 'hotAct', value: '新增当季推送模块'},
    {key: 'hotPro', value: '新增热门商品模块'},
    {key: 'promotion', value: '新增拼团活动模块'},
    {key: '', value: '新增团购活动模块'}];

  constructor(
    private productService: ProductService,
    private myAlertService: MyAlertService

  ) { }


  selectChange(item) {
    this.productData.proCategory = item.id;
    console.log(item);
  }
  addModuleBtn(type) {
    let that = this;
    console.log(type);
    that.indexData.otherModule.push({type: type, products:[]});
  }
  add(list) {
    console.log(list);
    list.push({});
  }
  delete(index, list) {
    let that = this;
    console.log(index);
    console.log(that.indexData[list]);
    if(list == 'indexBanner' && that.indexData[list].length == 1){
      that.myAlertService.warnMsg('banner不得少于1张！');
      return false;
    }
    this.myAlertService.confirmDialog('确认删除吗？', function (e) {
      that.indexData[list].splice(index, 1);
      console.log(that.indexData);
    });
  }
  onSubmit({value, valid}) {
    let that = this;
    this.myAlertService.confirmDialog('确认提交吗？', function (e) {
      that.submitted = true;
      // console.log(productForm);
      // console.log(productForm.value);
      console.log(that.indexData);
      console.log(that.productData);
      console.log(value);
      //name = name.trim();
      //if(!name) {return}
      // that.productService.create(that.productData)
      //   .then(hero => {
      //     //this.heros.push(hero);
      //     //this.selectedHero = null;
      //     that.myAlertService.successMsg('添加成功！');
      //   });
    });
    // that.user.email = ''
  }
  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }



  ngOnInit() {
    console.log(this.productService.isLoggedIn);
    this.productService.login();
    console.log(this.productService.isLoggedIn);

    // 初始化表单
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}/)]),
      password: new FormControl('', [Validators.required]),
      repeat: new FormControl('', [Validators.required]),
      // address: new FormGroup({
      //   province: new FormControl(''),
      //   city: new FormControl(''),
      //   area: new FormControl(''),
      //   addr: new FormControl('')
      // })
    });
  }

}
