import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBusinessUnitEditPageComponent } from './client-business-unit-edit-page.component';

describe('ClientBusinessUnitEditPageComponent', () => {
  let component: ClientBusinessUnitEditPageComponent;
  let fixture: ComponentFixture<ClientBusinessUnitEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBusinessUnitEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientBusinessUnitEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
