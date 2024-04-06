import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRenewPageComponent } from './contract-renew-page.component';

describe('ContractRenewPageComponent', () => {
  let component: ContractRenewPageComponent;
  let fixture: ComponentFixture<ContractRenewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractRenewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractRenewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
