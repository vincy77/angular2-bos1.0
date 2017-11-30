import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Order } from './trade';
import { Hero } from './hero';

@Injectable()
export class TradeService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private tradesUrl = 'api/orders';
  private tradeUrl = 'api/orders';
  private heroesUrl = 'api/hero';

  constructor(private http: Http) {}

  update(data: any): Promise<Hero> {
    const url = `${this.heroesUrl}/${data}`;
    return this.http.post(url, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }

  create(data: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: data}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }
  getHeros(data: any): Promise<Hero[]> {
    console.log(data);
    return this.http.get(this.heroesUrl)
      .toPromise() // 先利用toPromise操作符把Observable直接转换成Promise对象,
      // Angular 的Observable并没有一个toPromise操作符... 没有打包在一起发布,
      // 要从 RxJS 库中导入它们 import 'rxjs/add/operator/toPromise';
      .then(response => {
        return response.json().data as Hero[];
        //console.log(response.json().data as Order[]);
      })
      .catch(this.handleError);
  }

  getOrders(data: any): Promise<Order[]> {
    console.log(data);
    return this.http.get(this.tradesUrl)
      .toPromise() // 先利用toPromise操作符把Observable直接转换成Promise对象,
      // Angular 的Observable并没有一个toPromise操作符... 没有打包在一起发布,
      // 要从 RxJS 库中导入它们 import 'rxjs/add/operator/toPromise';
      .then(response => {
        return response.json().data as Order[];
        //console.log(response.json().data as Order[]);
      })
      .catch(this.handleError);
  }
  //
  getOrder(id: number): Promise<Order> {
    const url = `${this.tradeUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Order)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
