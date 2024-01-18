import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeDetailPageComponent } from './vehicle-type-detail-page.component';

describe('VehicleTypeDetailPageComponent', () => {
  let component: VehicleTypeDetailPageComponent;
  let fixture: ComponentFixture<VehicleTypeDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleTypeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
