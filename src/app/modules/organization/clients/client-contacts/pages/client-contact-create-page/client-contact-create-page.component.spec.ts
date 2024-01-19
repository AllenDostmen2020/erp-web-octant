import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactCreatePageComponent } from './client-contact-create-page.component';

describe('ClientContactCreatePageComponent', () => {
  let component: ClientContactCreatePageComponent;
  let fixture: ComponentFixture<ClientContactCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientContactCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientContactCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
