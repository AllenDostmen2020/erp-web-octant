import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDocumentPaymentCreateComponent } from './client-document-payment-create.component';

describe('ClientDocumentPaymentCreateComponent', () => {
  let component: ClientDocumentPaymentCreateComponent;
  let fixture: ComponentFixture<ClientDocumentPaymentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDocumentPaymentCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientDocumentPaymentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
