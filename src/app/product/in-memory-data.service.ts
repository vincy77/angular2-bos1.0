import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let products = [
      {
        id: 1,
        productTitle: 'lalalallalalal',
        productSubTitle: 'ioioioioioioioioioioio',
        proCategory: 1,
        productPrice: 22,
        imgUrl: '',
        status: ''
      }
    ];
    return {products};
  }
}
