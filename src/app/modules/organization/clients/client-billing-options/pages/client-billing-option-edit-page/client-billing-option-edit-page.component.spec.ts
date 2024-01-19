import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBillingOptionEditPageComponent } from './client-billing-option-edit-page.component';

describe('ClientBillingOptionEditPageComponent', () => {
  let component: ClientBillingOptionEditPageComponent;
  let fixture: ComponentFixture<ClientBillingOptionEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBillingOptionEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientBillingOptionEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
