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
export class ProductService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private productsUrl = 'api/products';
  // 分类相关api
  private addProcategoryUrl = `/api/addProCategory`;
  private findAllProCategoryUrl = `/api/findAllProCategory`;
  private findProCategoryUrl = `/api/findProCategory`;
  private deleteProCategoryUrl = `/api/deleteProCategory`;
  private sortCategoryUrl = `/api/sortCategory`;
  // 商品相关API
  private addProductUrl = `/api/addProduct`;
  private findAllProductUrl = `/api/findAllProduct`;
  private findCategoryProductUrl = `/api/findCategoryProduct`;
  private deleteProductUrl = `/api/deleteProduct`;
  private setProCategoryUrl = `/api/setProCategory`;
  private getProductDataUrl = `/api/getProductData`;
  private onSaleProductUrl = `/api/onSaleProduct`;
  private instockProductUrl = `/api/instockProduct`;
  // 菜谱相关api
  private addRecipeUrl = `/api/addRecipe`;
  private deleteRecipeUrl = `/api/deleteRecipe`;
  private findAllRecipeUrl = `/api/findAllRecipe`;
  private getRecipeDataUrl = `/api/getRecipeData`;
  private getIngredientsDetailUrl = `/api/getIngredientsDetail`;
  private uploadFileUrl = `/api/uploadFile2`;


  constructor(
    private http: HttpClient,
    private modalService: MyAlertService
  ) {}
  //

  isLoggedIn: boolean = false;
  login(){
    this.isLoggedIn=true;
  }
  // uploadFile(data): Observable<any> {
  //
  //   const url = `${this.uploadFileUrl}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
  //   return this.http.post(url,data, {
  //     headers: {
  //       'x-Requested-With': 'XMLHttpRequest',
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  //     .pipe(
  //       tap(res => {
  //         console.log(res);
  //         this.operationError(res);
  //       }),
  //       catchError(this.handleError('addProcategoryUrl', '保存分类失败！'))
  //     )
  // }
  /**
   * 新增商品分类
   * */
  addProCategory(data): Observable<any> {
    const url = `${this.addProcategoryUrl}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
    return this.http.post(url,data)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('addProcategoryUrl', '保存分类失败！'))
      )
  }
  /**
   * 获取所有商品分类
   * */
  getAllProCategory(): Observable<any> {
    const url = `${this.findAllProCategoryUrl}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
    console.log(url);
    return this.http.get(url)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('findAllProCategoryUrl', '获取分类列表失败！'))
      )
  }//findAllProCategory
  /**
   * 获取指定分类下所有商品分类
   * */
  getProCategoryList(id): Observable<any> {
    const url = `${this.findProCategoryUrl}/${id}`;
    console.log(url);
    return this.http.get(url)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('getCategoryNav', '获取商品分类失败！'))
      )
  }
  /**
   * 删除商品分类
   * */
  deleteProCategory(id): Observable<any> {
    const url = `${this.deleteProCategoryUrl}/${id}`;
    console.log(url);
    return this.http.get(url)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('getCategoryNav', '删除失败！'))
      )
  }
  /**
   * 排序商品分类
   * */
  sortCategory(data): Observable<any> {
    const url = `${this.sortCategoryUrl}`;
    return this.http.post(url, data)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('sortCategory', '排序失败！'))
      )
  }
  /****************************分界线****************************************************
   * **/
  /**
   * 新增商品
   * */
  addProduct(data): Observable<any> {
    const url = `${this.addProductUrl}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
    console.log(url);
    return this.http.post(url,data)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('addCategoryData', '保存失败！'))
      )
  }
  /**
   * 获取商品列表
   * */
  getProductList(data): Observable<any> {
    const url = `${this.findAllProductUrl}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
    console.log(url);
    return this.http.post(url,data)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('getCategoryNav', '获取商品列表失败！'))
      )
  }
  /**
   * 获取指定商品id的数据（编辑反显数据／详情页面）
   * */
  getProData(productId): Observable<any> {
    const url = `${this.getProductDataUrl}/${productId}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
    console.log(url);
    return this.http.get(url)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('getCategoryNav', '获取商品数据失败！'))
      )
  }
  /**
   * 获取指定分类下商品列表
   * */
  getCategoryProList(id): Observable<any> {
    const url = `${this.findCategoryProductUrl}/${id}`;
    console.log(url);
    return this.http.get(url)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('getCategoryNav', '获取商品列表失败！'))
      )
  }
  /**
   * 删除
   * */
  deleteProduct(id): Observable<any> {
    const url = `${this.deleteProductUrl}/${id}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
    return this.http.get(url)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('deleteCategoryData', '删除失败！'))
      )
  }
  /**
   * 删除
   * */
  setProCategory(data): Observable<any> {
    const url = `${this.setProCategoryUrl}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
    return this.http.post(url, data)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('deleteCategoryData', '设置商品分类失败！'))
      )
  }
  /**
   * 上架商品
   * */
  onSaleProduct(data): Observable<any> {
    const url = `${this.onSaleProductUrl}`;
    return this.http.post(url, data)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('deleteCategoryData', '上架失败！'))
      )
  }
  /**
   * 下架商品
   * */
  inStockProduct(data): Observable<any> {
    const url = `${this.instockProductUrl}`;
    return this.http.post(url, data)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('deleteCategoryData', '下架失败！'))
      )
  }


  /****************************分界线****************************************************
   * **/
  /**
   * 新增菜谱
   * */
  addRecipe(data): Observable<any> {
    const url = `${this.addRecipeUrl}`;
    return this.http.post(url, data)
      .pipe(
        tap(res => {
          this.operationError(res);
        }),
        catchError(this.handleError('addRecipe', '新增菜谱失败!'))
      )
  }
  /**
   * 删除菜谱
   * */
  deleteRecipe(recipeId): Observable<any> {
    const url = `${this.addRecipeUrl}/${recipeId}`;
    return this.http.get(url)
      .pipe(
        tap(res => {
          this.operationError(res);
        }),
        catchError(this.handleError('deleteRecipe', '删除菜谱失败!'))
      )
  }
  /**
   * 获取菜谱列表
   * */
  getRecipeList(data): Observable<any> {
    const url = `${this.findAllRecipeUrl}`;
    return this.http.post(url, data)
      .pipe(
        tap(res => {
          this.operationError(res);
        }),
        catchError(this.handleError('getRecipeList', '获取菜谱列表失败'))
      )
  }
  /**
   * 获取菜谱详情
   * */
  getRecipeData(recipeId): Observable<any> {
    const url = `${this.getRecipeDataUrl}/${recipeId}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
    console.log(url);
    return this.http.get(url)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('getRecipeData', '获取分类数据失败！'))
      )
  }
  /**
   * 获取菜谱菜材料详情
   * */
  getIngredientsDetail(data): Observable<any> {
    const url = `${this.getIngredientsDetailUrl}`; //'/api/findSubCategoryTreeByCategoryIdUrl';
    console.log(url);
    return this.http.post(url, data)
      .pipe(
        tap(res => {
          console.log(res);
          this.operationError(res);
        }),
        catchError(this.handleError('getIngredientsDetail', '获取材料数据失败！'))
      )
  }




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
