import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailPageComponent } from './vehicle-detail-page.component';

describe('VehicleDetailPageComponent', () => {
  let component: VehicleDetailPageComponent;
  let fixture: ComponentFixture<VehicleDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
