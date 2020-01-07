import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
// import { map, filter, switchMap } from 'rxjs/operators';
// import 'rxjs/add/operator/toPromise';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operator/map';
import { tap } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';

import { Order } from './trade';
import { Hero } from './hero';

import { MyAlertService } from '../../core/my-alert.service';

@Injectable()
export class TradeService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private tradesUrl = 'api/orders';
  private tradeUrl = 'api/orders';
  private heroesUrl = 'api/hero';

  constructor(
    private http: HttpClient,
    private modalService: MyAlertService
  ) {}
  /**
   * 删除某分类下实例
   * */
  deleteCategoryData(id): Observable<any> {
    const url = ``; //'/api/findSubCategoryTreeByCategoryIdUrl';
    console.log(url);
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
   * 请求成功，但是操作错误的报错（）
   * */
  private operationError(res){
    console.log((res && res['result'] && !res['result']['success']));
    if(res && res['result'] && !res['result']['success']){
      console.log(res['result']['message']);
      this.modalService.errorMsg(res['result']['message']);
      //this.modalService.toastError(res['result']['message'])
    }
  }
  /**
   * 请求失败的报错（404 500 参数错误）
   * */
  private handleError<T> (operation = 'operation', result?) {
    console.log(result)
    return (error: any): Observable<T> => {
      if(result){
        this.modalService.errorMsg(result);
      }
      console.log(error);
      console.log(result)
      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      console.log(of(result as T))
      return of(null as T);
    };
  }







  // update(data: any): Promise<Hero> {
  //   const url = `${this.heroesUrl}/${data}`;
  //   return this.http.post(url, JSON.stringify(data), {headers: this.headers})
  //     .toPromise()
  //     .then(() => data)
  //     .catch(this.handleError);
  // }
  //
  // create(data: string): Promise<Hero> {
  //   return this.http
  //     .post(this.heroesUrl, JSON.stringify({name: data}), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json().data as Hero)
  //     .catch(this.handleError);
  // }
  // getHeros(data: any): Promise<Hero[]> {
  //   console.log(data);
  //   return this.http.get(this.heroesUrl)
  //     .toPromise() // 先利用toPromise操作符把Observable直接转换成Promise对象,
  //     // Angular 的Observable并没有一个toPromise操作符... 没有打包在一起发布,
  //     // 要从 RxJS 库中导入它们 import 'rxjs/add/operator/toPromise';
  //     .then(response => {
  //       console.log(response);
  //       return response.json().data as Hero[];
  //       //console.log(response.json().data as Order[]);
  //     })
  //     .catch(this.handleError);
  // }
  //
  // getOrders(data: any): Promise<Order[]> {
  //   console.log(data);
  //   return this.http.get(this.tradesUrl)
  //     .toPromise() // 先利用toPromise操作符把Observable直接转换成Promise对象,
  //     // Angular 的Observable并没有一个toPromise操作符... 没有打包在一起发布,
  //     // 要从 RxJS 库中导入它们 import 'rxjs/add/operator/toPromise';
  //     .then(response => {
  //       console.log(response);
  //       return response.json().data as Order[];
  //       //console.log(response.json().data as Order[]);
  //     })
  //     .catch(this.handleError);
  // }
  // //
  // getOrder(id: number): Promise<Order> {
  //   const url = `${this.tradeUrl}/${id}`;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response.json().data as Order)
  //     .catch(this.handleError);
  // }
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }


}
