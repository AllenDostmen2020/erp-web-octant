import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUnsubscribeCreatePageComponent } from './vehicle-unsubscribe-create-page.component';

describe('VehicleUnsubscribeCreatePageComponent', () => {
  let component: VehicleUnsubscribeCreatePageComponent;
  let fixture: ComponentFixture<VehicleUnsubscribeCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleUnsubscribeCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleUnsubscribeCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
