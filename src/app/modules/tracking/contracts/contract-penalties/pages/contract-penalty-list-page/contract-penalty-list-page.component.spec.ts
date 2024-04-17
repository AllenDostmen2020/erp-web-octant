import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPenaltyListPageComponent } from './contract-penalty-list-page.component';

describe('ContractPenaltyListPageComponent', () => {
  let component: ContractPenaltyListPageComponent;
  let fixture: ComponentFixture<ContractPenaltyListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractPenaltyListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractPenaltyListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
