import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSListComponent } from './list.component';

describe('CMSListComponent', () => {
  let component: CMSListComponent;
  let fixture: ComponentFixture<CMSListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMSListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
