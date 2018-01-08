import {Directive, ElementRef, Input, HostBinding, HostListener, Attribute, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[Test]'
})
 export class TestDirective {
  // @Input() Test: string;
  // @HostBinding() get innerText() {
  //   return this.Test;
  // }
  // @HostListener('click',['$event'])
  //   onClick(event) {
  //     this.Test = 'Clicked!';
  // }
  // constructor(@Attribute('author') public author: string) {
  //   console.log(author);
  // }


  @Input('Test')
  set condition(newCondition: boolean) {
    if (!newCondition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }
}
