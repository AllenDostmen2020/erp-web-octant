import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBusinessUnitListPageComponent } from './client-business-unit-list-page.component';

describe('ClientBusinessUnitListPageComponent', () => {
  let component: ClientBusinessUnitListPageComponent;
  let fixture: ComponentFixture<ClientBusinessUnitListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBusinessUnitListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientBusinessUnitListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
