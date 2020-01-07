import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit, ChangeDetectorRef, enableProdMode } from '@angular/core';
import { MultipleSelectService } from './multiple-select.service';
enableProdMode();
@Component({
  selector: 'app-test',
  template: `
  <div class="btn-group" dropdown [autoClose]="false" container="body" #dropdown="bs-dropdown">
  <input id="button-nested2" dropdownToggle type="text" class="btn btn-primary dropdown-toggle show-selected"
         readonly="readonly" aria-controls="dropdown-nested" placeholder="请选择" [value]="selectedData" [name]="name">
         <div *ngFor="let item of list" (click)="testData(item)">{{item.categoryName}}</div>
</div>
`,
  styleUrls: ['multiple-select.component.scss']
})
export class TestComponent implements OnInit {
  @Input() list = [];
  @Input() multiple = false;
  @Input() name;
  @Input() option;
  test = [];
  @Output() optionChange = new EventEmitter();
  subscript;
  selectedData = '请选择';

  // @ViewChild('ccc') child: ElementRef;
  constructor(
    private service: MultipleSelectService,
    private el: ElementRef
  ) { }
  testData(item){
    item.isSelected = true;
  }

  list2 = [];
  ngOnInit() {
    console.log('kkk')
    this.list2 =JSON.parse(JSON.stringify(this.list));

    console.log(this.list)
    console.log(this.list2)
    this.subscript = this.service.selectedItemEventEmit.subscribe((res) => {
      console.log('klklklklkl')
      console.log(res);
      //this.selectedItemEvent(res);
    })
  }


}
