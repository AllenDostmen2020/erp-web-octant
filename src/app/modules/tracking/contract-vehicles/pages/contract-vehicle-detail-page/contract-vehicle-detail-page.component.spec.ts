import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractVehicleDetailPageComponent } from './contract-vehicle-detail-page.component';

describe('ContractVehicleDetailPageComponent', () => {
  let component: ContractVehicleDetailPageComponent;
  let fixture: ComponentFixture<ContractVehicleDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractVehicleDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractVehicleDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
