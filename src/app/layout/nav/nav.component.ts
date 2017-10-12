import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.less']
})
export class NavComponent implements OnInit {
  title = 'menu';
  activeMenu = '';
  menu = [
    {
      id: 1,
      title: '商品',
      icon: 'glyphicon-th',
      subMenu: [
        {
          id: 11,
          title: '创建商品',
          link: '/product/productAdd'
        },
        {
          id: 12,
          title: '商品列表',
          link: '/product/productList'
        }
      ]
    },
    {
      id: 2,
      title: '订单',
      icon: 'glyphicon-th',
      subMenu: [
        {
          id: 21,
          title: '订单列表',
          link: '/trade/tradeList'
        },
        {
          id: 22,
          title: '订单详情',
          link: '/trade/tradeDetail'
        }
      ]
    },
    {
      id: 3,
      title: '营销',
      icon: 'glyphicon-fire',
      subMenu: [
        {
          id: 31,
          title: '创建营销',
          link: '/promotion/promotionAdd'
        },
        {
          id: 32,
          title: '营销列表',
          link: '/promotion/promotionList'
        }
      ]
    },
    {
      id: 4,
      title: '用户',
      icon: 'glyphicon-user',
      subMenu: [
        {
          id: 41,
          title: '用户列表',
          link: '/user/userList'
        },
        {
          id: 42,
          title: '用户详情',
          link: '/user/userDetail'
        }
        ]
    }
    ];

  expandMenu(id): void {
    console.log(this.title);
    if(id == this.activeMenu) {
      this.activeMenu = '';
    } else {
      this.activeMenu = id;
    }

  }

  constructor() { }

  ngOnInit() {
  }

}
