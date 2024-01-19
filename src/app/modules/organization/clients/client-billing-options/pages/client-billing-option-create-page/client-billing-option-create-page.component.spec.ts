import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBillingOptionCreatePageComponent } from './client-billing-option-create-page.component';

describe('ClientBillingOptionCreatePageComponent', () => {
  let component: ClientBillingOptionCreatePageComponent;
  let fixture: ComponentFixture<ClientBillingOptionCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBillingOptionCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientBillingOptionCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
