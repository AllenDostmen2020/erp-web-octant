import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDocumentPaymentFormComponent } from './client-document-payment-form.component';

describe('ClientDocumentPaymentFormComponent', () => {
  let component: ClientDocumentPaymentFormComponent;
  let fixture: ComponentFixture<ClientDocumentPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDocumentPaymentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientDocumentPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
