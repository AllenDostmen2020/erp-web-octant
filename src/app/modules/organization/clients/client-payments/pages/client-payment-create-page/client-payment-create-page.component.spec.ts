import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaymentCreatePageComponent } from './client-payment-create-page.component';

describe('ClientPaymentCreatePageComponent', () => {
  let component: ClientPaymentCreatePageComponent;
  let fixture: ComponentFixture<ClientPaymentCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPaymentCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPaymentCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
