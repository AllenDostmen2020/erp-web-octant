import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaymentDetailPageComponent } from './client-payment-detail-page.component';

describe('ClientPaymentDetailPageComponent', () => {
  let component: ClientPaymentDetailPageComponent;
  let fixture: ComponentFixture<ClientPaymentDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPaymentDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPaymentDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
