import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let orders = [
      {
        orderNo: 11111,
        orderTime: '2017-01-01',
        shopName: 'yyyyy',
        orderItems: [
          {
            orderItem: {
              productImg: '',
              productName: 'kkkk',
              quantity: 3
            },
            returnRefundNo: '',
            hasReturnRefund: '',
            returnRefundStatus: ''

          },
          {
            orderItem: {
              productImg: '',
              productName: 'kkkk',
              quantity: 3
            },
            returnRefundNo: '',
            hasReturnRefund: '',
            returnRefundStatus: ''

          }
        ],
        buyerName: 'buyerName',
        consigneePhone: '18888888888',
        consignee: 'consignee',
        paymentAmount: 100,
        status: ''
      },
      {
        orderNo: 22222222,
        orderTime: '2017-01-03',
        shopName: '公告公告',
        orderItems: [
          {
            orderItem: {
              productImg: '',
              productName: 'kkkk',
              quantity: 3
            },
            returnRefundNo: '',
            hasReturnRefund: '',
            returnRefundStatus: ''

          }
        ],
        buyerName: '清清浅浅',
        consigneePhone: '17777777777',
        consignee: '放放风',
        paymentAmount: 100,
        status: ''
      }
    ];
    let hero = [
      {
        name: 'aaa',
        id: 1111
      }
    ]
    return {orders, hero};
  }
}
