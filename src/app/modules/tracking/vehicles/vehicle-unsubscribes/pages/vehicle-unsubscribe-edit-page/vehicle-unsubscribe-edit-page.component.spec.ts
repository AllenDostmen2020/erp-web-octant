import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUnsubscribeEditPageComponent } from './vehicle-unsubscribe-edit-page.component';

describe('VehicleUnsubscribeEditPageComponent', () => {
  let component: VehicleUnsubscribeEditPageComponent;
  let fixture: ComponentFixture<VehicleUnsubscribeEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleUnsubscribeEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleUnsubscribeEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
