import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeCreatePageComponent } from './vehicle-type-create-page.component';

describe('VehicleTypeCreatePageComponent', () => {
  let component: VehicleTypeCreatePageComponent;
  let fixture: ComponentFixture<VehicleTypeCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleTypeCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
