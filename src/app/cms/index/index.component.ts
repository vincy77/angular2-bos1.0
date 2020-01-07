import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from "@angular/forms";

import { Product } from '../shared/product';
import { MyAlertService } from '../../core/my-alert.service';
import { CMSService } from '../shared/cms.service';

import { CMSBannerComponent } from '../shared/banner/banner.component';

@Component({
  selector: 'cms-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.scss']
})
export class CMSIndexComponent implements OnInit, AfterViewInit {
  //除了使用了变量赋值的方式初始化组件，还可以使用构造函数constructor()来声明和初始化属性
  @ViewChild(CMSBannerComponent)
  private cmsBanner:CMSBannerComponent;
  user: FormGroup;
  productData = new Product('', '', '', '', 100);
  submitted = false;
  indexData:any = {
    indexBanner: [{bannerImg: '', bannerLink: '11'},{bannerImg: '', bannerLink: '22'}],
    categoryModule: [{}, {}],
    headlineModule: [{}, {}],
    fancyModule: [{}],
    saleModule: [{}],
    bestModule: [{}],
    mainAct: [{},{},{},{}],
    otherModule: [{type: 'hotAct', bannerImg: '', bannerUrl: '', products: [{productUrl: ''}]}]
  };

  newModule = [
    {key: 'hotAct', value: '新增当季推送模块'},
    {key: 'hotPro', value: '新增热门商品模块'},
    {key: 'promotion', value: '新增拼团活动模块'},
    {key: '', value: '新增团购活动模块'}];

  constructor(
    private cmsService: CMSService,
    private myAlertService: MyAlertService,
    private fb: FormBuilder

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
  // onSubmit({value, valid}) {
  onSubmit(form) {
    let that = this;
    console.log(form);
    this.myAlertService.confirmDialog('确认提交吗？', function (e) {
      that.submitted = true;
      console.log(that.indexData);
      console.log(that.indexData[form]);
      let params = {
        cmsId: '',
        id: '',
        banner: that.indexData[form]
      }
      that.cmsService.createBanner(params)
        .subscribe(res => {
          if(res.success){
            that.myAlertService.successMsg('添加成功！');

            // if(!that.productData['productId']){
            //   that.productData = res.data;
            //   that.myAlertService.successMsg('商品保存成功！');
            // }else{
            //   that.myAlertService.successMsg('商品修改成功！');
            // }
            // that.activatedRoute.snapshot.paramMap.get('productId') = res.data.productId;

          }
        });

    });
    // that.user.email = ''
  }
  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }


  /**
   * 最终提交（使用当前为首页内容）
   * */
  confirmSubmit() {

  }

  ngOnInit() {
    console.log(this.cmsService.isLoggedIn);
    this.cmsService.login();
    console.log(this.cmsService.isLoggedIn);
  }
  /**
   * */
  ngAfterViewInit() {

  }

}
