import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactListPageComponent } from './client-contact-list-page.component';

describe('ClientContactListPageComponent', () => {
  let component: ClientContactListPageComponent;
  let fixture: ComponentFixture<ClientContactListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientContactListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientContactListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
