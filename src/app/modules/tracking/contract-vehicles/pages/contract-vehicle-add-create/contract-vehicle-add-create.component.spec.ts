import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractVehicleAddCreateComponent } from './contract-vehicle-add-create.component';

describe('ContractVehicleAddCreateComponent', () => {
  let component: ContractVehicleAddCreateComponent;
  let fixture: ComponentFixture<ContractVehicleAddCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractVehicleAddCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractVehicleAddCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
