import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPlanFormComponent } from './contract-plan-form.component';

describe('ContractPlanFormComponent', () => {
  let component: ContractPlanFormComponent;
  let fixture: ComponentFixture<ContractPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractPlanFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
