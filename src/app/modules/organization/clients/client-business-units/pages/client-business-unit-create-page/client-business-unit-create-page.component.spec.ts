import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBusinessUnitCreatePageComponent } from './client-business-unit-create-page.component';

describe('ClientBusinessUnitCreatePageComponent', () => {
  let component: ClientBusinessUnitCreatePageComponent;
  let fixture: ComponentFixture<ClientBusinessUnitCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBusinessUnitCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientBusinessUnitCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
