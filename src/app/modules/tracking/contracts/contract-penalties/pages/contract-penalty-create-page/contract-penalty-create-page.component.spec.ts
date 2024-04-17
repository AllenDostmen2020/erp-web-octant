import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPenaltyCreatePageComponent } from './contract-penalty-create-page.component';

describe('ContractPenaltyCreatePageComponent', () => {
  let component: ContractPenaltyCreatePageComponent;
  let fixture: ComponentFixture<ContractPenaltyCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractPenaltyCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractPenaltyCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
