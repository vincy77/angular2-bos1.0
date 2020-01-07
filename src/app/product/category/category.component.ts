import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MyAlertService } from '../../core/my-alert.service';
import { TreeService } from '../../core/service/tree.service';
import { ProductService } from '../shared/product.service';
import { FileUploader } from 'ng2-file-upload';
import { SortablejsOptions } from 'angular-sortablejs';
const URL = `/api/uploadFile`;
const URL2 = `/api/upload-multi`;
// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  // 新增分类弹窗
  public newCategoryModalref: BsModalRef;
  //
  node = 0;
  // 原始分类列表
  categoryList = [];
  // 处理成tree结构的分类列表
  categoryShowList = [];
  list = [];
  // 新建分类表单数据
  categoryData = {};
  //
  isEdit = false;
  // 图片预览链接()
  singleSetectedImgUrl = '';
  multipleSetectedImgUrl = [];
  // 上传插件
  uploader = {};
  // 上传插件配置参数
  options = {
    url: URL,
    itemAlias: 'file',
    autoUpload:true
  };
  // 是否是多张图片
  isMultiple = false;
  //
  sortOptions: SortablejsOptions = {
    animation: 300,
    // handle: '.sort-handle',
    // filter: ''
  }
  constructor(
    private modalService: BsModalService,
    private myAlert: MyAlertService,
    private productService: ProductService,
    private treeService: TreeService
  ) {
    this.uploader['categoryImg'] = new FileUploader(this.options);
    this.uploader['categoryImg2'] = new FileUploader(this.options);
  }
  /**
   * 选择图片后回调
   * */
  selectedFileOnChanged(i, event, name) {
    // 这里是文件选择完成后的操作处理
    let that = this;
    that.isMultiple = event.target.multiple;
    // 多张图片
    // if(that.isMultiple){
    //   that.uploader[name].queue.forEach((q, i) => {
    //     if(that.multipleSetectedImgUrl.length == 0 || i >= that.multipleSetectedImgUrl.length){
    //       let reader = new FileReader();
    //       reader.readAsDataURL(q.some);//生成base64图片地址，实现本地预览。只是same属性被protected修饰，需要修改为public。
    //       reader.onload = function () {
    //         that.multipleSetectedImgUrl.push(this.result);
    //       }
    //     }
    //   });
    // }else{
    //   // 单张图片
    //   let reader: FileReader = new FileReader();
    //   let q = that.uploader[name].queue[that.uploader[name].queue.length - 1];
    //   reader.readAsDataURL(q.some);
    //   reader.onload = function () {
    //     that.singleSetectedImgUrl = this.result;
    //   }
    // }
    this.uploadImgCallback(name);
  }
  /**
   * 图片上传回调
   * */
  uploadImgCallback(name){
    let that = this;
    // 怎么给后台传参数（目前只会用headers传参）
    // this.uploader.options.headers = [{ name: "file-name", value: that.categoryData['categoryImg'] }];
    // this.uploader.queue[this.uploader.queue.length - 1].upload(); // 开始上传
    // this.uploader[name].uploadAll();
    this.uploader[name].onSuccessItem = (item, res, status, headers) => {
      if(that.isMultiple){
        that.categoryData[name].push(JSON.parse(res).data);
      }else{
        that.categoryData[name] = JSON.parse(res).data;
      }
      // 单张图片上传文件成功，上传多张图片的话会执行多次
      if (status == 200) {
        console.log('success');
        // 上传文件成功后获取服务器返回的数据
        //根据项目需求处理返回来的数据；
      } else {
        // 上传文件后获取服务器返回的数据错误
        console.log('error');
      }
    };
    this.uploader[name].onErrorItem = (item, res, status, headers) => {
      that.myAlert.errorMsg('上传图片失败！');
    }
    this.uploader[name].onCompleteAll = function () {
      console.log('over');
      console.log(that.categoryData);
    }
  }
  /**
  * 新增分类
  * */
  newCategory(type, template, item) {
    this.isEdit = false;
    this.node = type;
    this.categoryData = {};
    // this.singleSetectedImgUrl = '';
    if(item){
      this.categoryData['parentId'] = item.categoryId;
      this.list = item.children;
    }else{
      this.categoryData['parentId'] = 0;
      this.list = this.categoryShowList;
    }
    this.newCategoryModalref = this.modalService.show(template);
  }
  /**
   * 编辑分类
   * */
  editCategory(type, template, item) {
    this.isEdit = true;
    this.node = type;
    this.categoryData = item;
    // this.singleSetectedImgUrl = item['categoryImg'];
    this.newCategoryModalref = this.modalService.show(template);
  }
  /**
   * 删除分类
   * */
  deleteCategory(item, list, index){
    let that = this;
    this.myAlert.confirmDialog('确认提交吗？', function (e) {
      that.productService.deleteProCategory(item.categoryId).subscribe(res => {
        if(res.success){
          if(list){
            list.splice(index, 1);
          }
          that.myAlert.successMsg('删除分类成功！');
        }
      });
    });
  }
  /**
   * 提交分类
   * */
  onSubmit(categoryForm){
    let that = this;
    this.myAlert.confirmDialog('确认提交吗？', function (e) {
      // that.submitted = true;
      console.log(categoryForm.value);
      console.log(that.categoryData);
      let reqData = Object.assign(categoryForm.value, {parentId: that.categoryData['parentId'], categoryImg: that.categoryData['categoryImg'] || []});
      reqData = that.isEdit ? Object.assign(reqData, {categoryId: that.categoryData['categoryId']}): reqData;
      console.log(reqData);
      that.productService.addProCategory(reqData).subscribe(res => {
        console.log(res);
        if(res.success){
          that.newCategoryModalref.hide();
          let data = res.data;
          Object.assign(data, {isOpen: false, children: []});
          if(that.isEdit){
            that.myAlert.successMsg('修改分类成功！');
          }else{
            that.list.push(data);
            that.myAlert.successMsg('新增分类成功！');
          }
        }
      });
    });
  }
  /**
   * 获取商品分类
   * */
  getProCategory(){
    let that = this;
    that.productService.getAllProCategory().subscribe(res => {
      console.log(res);
      if(res.success){
        that.categoryList = res.data || [];
        // that.categoryShowList = [...that.categoryList];
        that.categoryShowList = that.treeService.changeCategoryList(that.categoryList, 'parentId', 'categoryId', '0');
      }
    });
  }
  /**
   * 分类数据处理（tree结构）
   * */
  // changeCategoryList(showList){
  //   let that = this;
  //   let list1 = [];
  //   let list2 = [];
  //   showList.forEach(item => {
  //     item.isOpen = false;
  //     item.children = [];
  //     if(item.parentId == '0'){
  //       list1.push(item)
  //     }else{
  //       list2.push(item)
  //     }
  //   });
  //   this.setNavTree(list1,list2);
  //   that.categoryShowList = list1;
  //   console.log(that.categoryShowList)
  // }
  // setNavTree(list1,list2){
  //   let that = this;
  //   list1.forEach(item => {
  //     let list = [];
  //     list2.forEach(i => {
  //       if(item.categoryId == i.parentId){
  //         item.children.push(i);
  //       }else{
  //         list.push(i);
  //       }
  //     });
  //     if(list.length > 0 && item.children.length > 0){
  //       that.setNavTree(item.children,list);
  //     }
  //   });
  // }

  sortCategory() {
    let that = this;
    that.productService.sortCategory(that.categoryShowList).subscribe(res => {
      console.log(res);
    });
  }
  ngOnInit() {
    this.getProCategory();
  }

}
