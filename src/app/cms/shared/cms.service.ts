import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operator/map';
import { tap } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { MyAlertService } from '../../core/my-alert.service';

@Injectable()
export class CMSService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private cmsUrl = '/api/cms/';
  // 分类相关api
  private createBannerUrl = `/api/cms/createBanner`;


  constructor(
    private http: HttpClient,
    private modalService: MyAlertService
  ) {}
  //

  isLoggedIn: boolean = false;
  login(){
    this.isLoggedIn=true;
  }
  /**
   * 新增商品分类
   * */
  createBanner(data): Observable<any> {
    console.log(data)
    console.log(this.createBannerUrl)
    const url = `${this.createBannerUrl}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
    return this.http.post(url,data)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('addProcategoryUrl', '保存cms banner失败！'))
      )
  }

  /**
   * 获取菜谱详情
   * */
  // getRecipeData(recipeId): Observable<any> {
  //   const url = `${this.getRecipeDataUrl}/${recipeId}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
  //   console.log(url);
  //   return this.http.get(url)
  //     .pipe(
  //       tap(res => {
  //         console.log(res);
  //         this.operationError(res);
  //       }),
  //       catchError(this.handleError('getRecipeData', '获取分类数据失败！'))
  //     )
  // }


  /****************************分界线****************************************************
   * **/



  /**
   * 请求成功，但是操作错误的报错（）
   * */
  private operationError(res){
    console.log((res && res['result'] && !res['result']['success']));
    if(res && !res['success']){
      console.log(res['msg']);
      this.modalService.errorMsg(res['msg']);
      //this.modalService.toastError(res['result']['message'])
    }
  }
  /**
   * 请求失败的报错（404 500 参数错误）
   * */
  private handleError<T> (operation = 'operation', result?) {
    console.log(result)
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(result);
      let res = result || '操作失败！';
      this.modalService.errorMsg(res);
      console.log(error);
      console.log(result)
      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      console.log(of(result as T));

      return of(res as T);
    };
  }

}
