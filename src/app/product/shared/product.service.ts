import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProductService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private productsUrl = 'api/products';
  // //private heroesUrl = 'api/hero';
  // //
  constructor(private http: Http) {}
  //
  // update(data: any): Promise<any> {
  //   const url = `${this.heroesUrl}/${data}`;
  //   return this.http.put(url, JSON.stringify(data), {headers: this.headers})
  //     .toPromise()
  //     .then(() => data)
  //     .catch(this.handleError);
  // }
  isLoggedIn: boolean = false;
  login(){
    this.isLoggedIn=true;
  }
  create(data: object): Promise<any> {
    return this.http
      .post(this.productsUrl, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  // getOrders(data: any): Promise<Order[]> {
  //   console.log(data);
  //   return this.http.get(this.tradesUrl)
  //     .toPromise() // 先利用toPromise操作符把Observable直接转换成Promise对象,
  //     // Angular 的Observable并没有一个toPromise操作符... 没有打包在一起发布,
  //     // 要从 RxJS 库中导入它们 import 'rxjs/add/operator/toPromise';
  //     .then(response => {
  //       return response.json().data as Order[];
  //       //console.log(response.json().data as Order[]);
  //     })
  //     .catch(this.handleError);
  // }
  getProducts(data: any): Promise<any> {
    console.log(data);
    return this.http.get(this.productsUrl)
      .toPromise()
      .then(response => {
        return response.json().data;
        //console.log(response.json().data as Order[]);
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
