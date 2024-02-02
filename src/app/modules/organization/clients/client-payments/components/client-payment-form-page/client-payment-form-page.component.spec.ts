import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaymentFormPageComponent } from './client-payment-form-page.component';

describe('ClientPaymentFormPageComponent', () => {
  let component: ClientPaymentFormPageComponent;
  let fixture: ComponentFixture<ClientPaymentFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPaymentFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPaymentFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
