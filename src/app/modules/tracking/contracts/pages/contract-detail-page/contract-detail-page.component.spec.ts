import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDetailPageComponent } from './contract-detail-page.component';

describe('ContractDetailPageComponent', () => {
  let component: ContractDetailPageComponent;
  let fixture: ComponentFixture<ContractDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
