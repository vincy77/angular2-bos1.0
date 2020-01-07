import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss']
})
export class CMSListComponent implements OnInit {

  itemsPerPage: number = 10;
  totalItems: number = 0;
  page: number = 1;
  maxSize:number = 5;
  cmsList = [];
  constructor() { }

  /**
   * 列表换页
   * */
  pageChanged(event) {
    this.page = event.page;
    // this.getRecipeList();
  }
  createCMS() {

  }

  ngOnInit() {
  }

}
