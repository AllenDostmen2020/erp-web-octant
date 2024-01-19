import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactDetailPageComponent } from './client-contact-detail-page.component';

describe('ClientContactDetailPageComponent', () => {
  let component: ClientContactDetailPageComponent;
  let fixture: ComponentFixture<ClientContactDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientContactDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientContactDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
