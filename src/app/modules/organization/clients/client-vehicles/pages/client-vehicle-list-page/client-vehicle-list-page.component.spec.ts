import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVehicleListPageComponent } from './client-vehicle-list-page.component';

describe('ClientVehicleListPageComponent', () => {
  let component: ClientVehicleListPageComponent;
  let fixture: ComponentFixture<ClientVehicleListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientVehicleListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientVehicleListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
