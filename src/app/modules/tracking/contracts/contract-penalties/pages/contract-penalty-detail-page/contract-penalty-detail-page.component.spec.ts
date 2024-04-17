import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPenaltyDetailPageComponent } from './contract-penalty-detail-page.component';

describe('ContractPenaltyDetailPageComponent', () => {
  let component: ContractPenaltyDetailPageComponent;
  let fixture: ComponentFixture<ContractPenaltyDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractPenaltyDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractPenaltyDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
