import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeEditPageComponent } from './vehicle-type-edit-page.component';

describe('VehicleTypeEditPageComponent', () => {
  let component: VehicleTypeEditPageComponent;
  let fixture: ComponentFixture<VehicleTypeEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleTypeEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
