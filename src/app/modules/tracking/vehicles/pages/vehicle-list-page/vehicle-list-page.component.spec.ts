import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListPageComponent } from './vehicle-list-page.component';

describe('VehicleListPageComponent', () => {
  let component: VehicleListPageComponent;
  let fixture: ComponentFixture<VehicleListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
