import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoductDetailsPopupComponent } from './poduct-details-popup.component';

describe('PoductDetailsPopupComponent', () => {
  let component: PoductDetailsPopupComponent;
  let fixture: ComponentFixture<PoductDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoductDetailsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoductDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
