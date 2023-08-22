import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedBillComponent } from './scanned-bill.component';

describe('ScannedBillComponent', () => {
  let component: ScannedBillComponent;
  let fixture: ComponentFixture<ScannedBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannedBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScannedBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
