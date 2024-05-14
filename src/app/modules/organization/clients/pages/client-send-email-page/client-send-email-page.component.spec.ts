import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSendEmailPageComponent } from './client-send-email-page.component';

describe('ClientSendEmailPageComponent', () => {
  let component: ClientSendEmailPageComponent;
  let fixture: ComponentFixture<ClientSendEmailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSendEmailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientSendEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
