import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.less']
})
export class ConfirmDialogComponent implements OnInit {
  data: {};

  constructor(
    private modalService: BsModalService
  ) { }

  //弹窗
  public confirmModalref: BsModalRef;

  //
  public openConfirmDialog(template, message) {
    this.data = {
      message: message
    };
    this.confirmModalref = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(): void {
    //this.message = 'Confirmed!';
    this.confirmModalref.hide();
  }

  decline(): void {
    //this.message = 'Declined!';
    this.confirmModalref.hide();
  }

  ngOnInit() {
  }
}
