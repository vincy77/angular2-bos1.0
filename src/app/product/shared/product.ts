export class Product {
  constructor(
    public productId: string,
    public title: string,
    public subTitle: string,
    public categoryId: string,
    public categoryName: string,
    public productImg: Array<string>,
    public price: number
  ) {}
}
