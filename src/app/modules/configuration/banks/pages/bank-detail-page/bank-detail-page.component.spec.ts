import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDetailPageComponent } from './bank-detail-page.component';

describe('BankDetailPageComponent', () => {
  let component: BankDetailPageComponent;
  let fixture: ComponentFixture<BankDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
