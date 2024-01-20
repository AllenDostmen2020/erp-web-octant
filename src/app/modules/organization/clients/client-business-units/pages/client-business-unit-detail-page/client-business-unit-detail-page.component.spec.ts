import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBusinessUnitDetailPageComponent } from './client-business-unit-detail-page.component';

describe('ClientBusinessUnitDetailPageComponent', () => {
  let component: ClientBusinessUnitDetailPageComponent;
  let fixture: ComponentFixture<ClientBusinessUnitDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBusinessUnitDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientBusinessUnitDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
