import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FileUploader } from 'ng2-file-upload';
const URL = `/api/uploadFile`;
@Injectable()
export class UploadFileService {
  // 上传插件
  uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'file',
    autoUpload: true
  });
  // 是否是多张图片
  isMultiple = false;

  constructor() {}
  /**
   * 图片上传回调
   * */
  uploadImgCallback(uploader, i) {
    let that = this;

    console.log(uploader)

    // this.uploader[name].uploadAll();
    uploader.onSuccessItem = (item, res, status, headers) => {
      // 单张图片上传文件成功，上传多张图片的话会执行多次
      console.log(status)
      if (status == 200) {
        if(that.isMultiple){
          // 上传成功后把返回的图片链接添加道商品信息中
          // that.productData[name] = that.productData[name] ? that.productData[name] : [];
          // that.productData[name].push(JSON.parse(res).data);
        }else{
          if(i || (i == 0)) {
            //that.cookStep[i]['stepImg'] = JSON.parse(res).data;
          }else{
            //that.productData[name] = JSON.parse(res).data;
          }
        }

        console.log(uploader.queue);
        console.log('success'); // 上传文件成功后获取服务器返回的数据,根据项目需求处理返回来的数据；
        return JSON.parse(res).data;
      } else {
        console.log('error'); // 上传文件后获取服务器返回的数据错误
      }
    };
    // uploader.onCompleteAll = function () {
    //   console.log('over');
    //
    // }
  }
}
