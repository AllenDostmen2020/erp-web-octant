import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleViewPageComponent } from './vehicle-view-page.component';

describe('VehicleViewPageComponent', () => {
  let component: VehicleViewPageComponent;
  let fixture: ComponentFixture<VehicleViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
