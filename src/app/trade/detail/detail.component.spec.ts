import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeDetailComponent } from './detail.component';

describe('TradeDetailComponent', () => {
  let component: TradeDetailComponent;
  let fixture: ComponentFixture<TradeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
