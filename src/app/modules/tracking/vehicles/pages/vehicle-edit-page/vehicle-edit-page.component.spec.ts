import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleEditPageComponent } from './vehicle-edit-page.component';

describe('VehicleEditPageComponent', () => {
  let component: VehicleEditPageComponent;
  let fixture: ComponentFixture<VehicleEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
