import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountEditPageComponent } from './client-account-edit-page.component';

describe('ClientAccountEditPageComponent', () => {
  let component: ClientAccountEditPageComponent;
  let fixture: ComponentFixture<ClientAccountEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAccountEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientAccountEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
