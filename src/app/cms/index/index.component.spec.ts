import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSIndexComponent } from './index.component';

describe('CMSIndexComponent', () => {
  let component: CMSIndexComponent;
  let fixture: ComponentFixture<CMSIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMSIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
