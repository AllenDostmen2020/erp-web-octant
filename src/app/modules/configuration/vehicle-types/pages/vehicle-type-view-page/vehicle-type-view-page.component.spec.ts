import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeViewPageComponent } from './vehicle-type-view-page.component';

describe('VehicleTypeViewPageComponent', () => {
  let component: VehicleTypeViewPageComponent;
  let fixture: ComponentFixture<VehicleTypeViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleTypeViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
