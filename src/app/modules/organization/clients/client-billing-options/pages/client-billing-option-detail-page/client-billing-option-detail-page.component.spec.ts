import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBillingOptionDetailPageComponent } from './client-billing-option-detail-page.component';

describe('ClientBillingOptionDetailPageComponent', () => {
  let component: ClientBillingOptionDetailPageComponent;
  let fixture: ComponentFixture<ClientBillingOptionDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBillingOptionDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientBillingOptionDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
