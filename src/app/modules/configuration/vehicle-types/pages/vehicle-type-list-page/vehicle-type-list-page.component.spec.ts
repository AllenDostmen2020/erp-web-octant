import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeListPageComponent } from './vehicle-type-list-page.component';

describe('VehicleTypeListPageComponent', () => {
  let component: VehicleTypeListPageComponent;
  let fixture: ComponentFixture<VehicleTypeListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleTypeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
