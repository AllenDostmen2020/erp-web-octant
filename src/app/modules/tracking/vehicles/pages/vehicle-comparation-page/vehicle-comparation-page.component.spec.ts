import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleComparationPageComponent } from './vehicle-comparation-page.component';

describe('VehicleComparationPageComponent', () => {
  let component: VehicleComparationPageComponent;
  let fixture: ComponentFixture<VehicleComparationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleComparationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleComparationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
