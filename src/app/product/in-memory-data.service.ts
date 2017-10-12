import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let products = [
      {
        productTitle: 'lalalallalalal',
        productSubTitle: 'ioioioioioioioioioioio',
        price: 22,
        productImg: '',
        status: ''
      }
    ];
    return {products};
  }
}
