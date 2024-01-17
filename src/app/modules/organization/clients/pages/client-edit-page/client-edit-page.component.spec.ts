import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditPageComponent } from './client-edit-page.component';

describe('ClientEditPageComponent', () => {
  let component: ClientEditPageComponent;
  let fixture: ComponentFixture<ClientEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
