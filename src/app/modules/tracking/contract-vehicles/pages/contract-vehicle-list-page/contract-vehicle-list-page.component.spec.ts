import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractVehicleListPageComponent } from './contract-vehicle-list-page.component';

describe('ContractVehicleListPageComponent', () => {
  let component: ContractVehicleListPageComponent;
  let fixture: ComponentFixture<ContractVehicleListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractVehicleListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractVehicleListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
