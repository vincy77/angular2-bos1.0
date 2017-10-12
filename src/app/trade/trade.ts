export class Order {
  //orderNo: string;
  // orderTime: string;
  // shopName: string;
  // //orderItems: OrderItems[];
  // buyerName: string;
  // consignee: string;
  // consigneePhone: string;
  // paymentAmount: number;
  // status: string;

}
export class OrderItems {
  returnRefundNo: string;
  hasReturnRefund: string;
  returnRefundStatus: string;
  orderItem: OrderItem;
}
export class OrderItem {
  productImg: string;
  productName: string;
  quantity: number;
}
// orderItems: [
//   {
//     orderItem: {
//       productImg: '',
//       productName: 'kkkk',
//       quantity: 3
//     },
//     returnRefundNo: '',
//     hasReturnRefund: '',
//     returnRefundStatus: ''
//
//   }
// ],
