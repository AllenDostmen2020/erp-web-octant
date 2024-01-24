import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUnsubscribeListPageComponent } from './vehicle-unsubscribe-list-page.component';

describe('VehicleUnsubscribeListPageComponent', () => {
  let component: VehicleUnsubscribeListPageComponent;
  let fixture: ComponentFixture<VehicleUnsubscribeListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleUnsubscribeListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleUnsubscribeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
