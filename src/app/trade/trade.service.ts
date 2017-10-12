import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Order } from './trade';
import { Hero } from './hero';

@Injectable()
export class TradeService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private tradeUrl = 'api/orders';
  private heroesUrl = 'api/hero';

  constructor(private http: Http) {}

  update(data: any): Promise<Hero> {
    const url = `${this.heroesUrl}/${data}`;
    return this.http.put(url, JSON.stringify(data), {headers: this.headers})
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

  getOrders(data: any): Promise<Order[]> {
    console.log(data);
    return this.http.get(this.tradeUrl)
      .toPromise()
      .then(response => {
        return response.json().data as Order[];
        //console.log(response.json().data as Order[]);
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
