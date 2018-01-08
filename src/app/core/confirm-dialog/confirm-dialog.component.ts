import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.less']
})
export class ConfirmDialogComponent implements OnInit {
  data: {};
  condition: boolean = false;

  constructor(
  ) { }

  ngOnInit() {
  }
}
