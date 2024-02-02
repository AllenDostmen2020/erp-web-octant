import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaymentListPageComponent } from './client-payment-list-page.component';

describe('ClientPaymentListPageComponent', () => {
  let component: ClientPaymentListPageComponent;
  let fixture: ComponentFixture<ClientPaymentListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPaymentListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPaymentListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
