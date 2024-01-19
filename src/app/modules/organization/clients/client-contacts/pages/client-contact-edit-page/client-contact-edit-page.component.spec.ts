import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactEditPageComponent } from './client-contact-edit-page.component';

describe('ClientContactEditPageComponent', () => {
  let component: ClientContactEditPageComponent;
  let fixture: ComponentFixture<ClientContactEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientContactEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientContactEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
