// import { Injectable } from '@angular/core';
// import { FileUploader } from 'ng2-file-upload';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class UploaderService {
//
//   uploader = {};
//   constructor(
//   ) {
//     this.uploader['productImg'] = new FileUploader(this.options);
//   }
//
//   /**
//    * 选择图片后回调
//    * */
//   selectedFileOnChanged(i, event, name) {
//     // 这里是文件选择完成后的操作处理
//     let that = this;
//     that.isMultiple = event.target.multiple;
//     // 多张图片
//     if(that.isMultiple){
//       that.uploader[name].queue.forEach((q, i) => {
//         if(that.multipleSetectedImgUrl.length == 0 || i >= that.multipleSetectedImgUrl.length){
//           let reader = new FileReader();
//           reader.readAsDataURL(q.some);//生成base64图片地址，实现本地预览。只是same属性被protected修饰，需要修改为public。
//           reader.onload = function () {
//             that.multipleSetectedImgUrl.push(this.result);
//           }
//         }
//       });
//     }else{
//       // 单张图片
//       let reader: FileReader = new FileReader();
//       let q = that.uploader[name].queue[that.uploader[name].queue.length - 1];
//       reader.readAsDataURL(q.some);
//       reader.onload = function () {
//         that.singleSetectedImgUrl = this.result;
//       }
//     }
//     this.uploadImgCallback(name);
//   }
//   /**
//    * 图片上传回调
//    * */
//   uploadImgCallback(name){
//     let that = this;
//     // this.uploader.queue[this.uploader.queue.length - 1].upload(); // 开始上传
//     // this.uploader[name].uploadAll();
//     this.uploader[name].onSuccessItem = (item, res, status, headers) => {
//       if(that.isMultiple){
//       }else{
//       }
//       // 单张图片上传文件成功，上传多张图片的话会执行多次
//       if (status == 200) {
//         console.log('success');
//         // 上传文件成功后获取服务器返回的数据
//         //根据项目需求处理返回来的数据；
//       } else {
//         // 上传文件后获取服务器返回的数据错误
//         console.log('error');
//       }
//     };
//     this.uploader[name].onCompleteAll = function () {
//       console.log('over');
//     }
//   }
// }
