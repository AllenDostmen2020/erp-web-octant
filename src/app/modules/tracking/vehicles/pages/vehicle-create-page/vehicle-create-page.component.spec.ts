import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCreatePageComponent } from './vehicle-create-page.component';

describe('VehicleCreatePageComponent', () => {
  let component: VehicleCreatePageComponent;
  let fixture: ComponentFixture<VehicleCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
