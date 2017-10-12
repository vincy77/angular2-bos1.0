import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProductService {

  // private headers = new Headers({'Content-Type': 'application/json'});
  // private tradeUrl = 'api/orders';
  // private heroesUrl = 'api/hero';
  //
  // constructor(private http: Http) {}
  //
  // update(data: any): Promise<any> {
  //   const url = `${this.heroesUrl}/${data}`;
  //   return this.http.put(url, JSON.stringify(data), {headers: this.headers})
  //     .toPromise()
  //     .then(() => data)
  //     .catch(this.handleError);
  // }
  //
  // create(data: string): Promise<any> {
  //   return this.http
  //     .post(this.heroesUrl, JSON.stringify({name: data}), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json().data)
  //     .catch(this.handleError);
  // }
  //
  // getOrders(data: any): Promise<any> {
  //   console.log(data);
  //   return this.http.get(this.tradeUrl)
  //     .toPromise()
  //     .then(response => {
  //       return response.json().data;
  //       //console.log(response.json().data as Order[]);
  //     })
  //     .catch(this.handleError);
  // }
  //
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }


}
