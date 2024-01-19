import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountDetailPageComponent } from './client-account-detail-page.component';

describe('ClientAccountDetailPageComponent', () => {
  let component: ClientAccountDetailPageComponent;
  let fixture: ComponentFixture<ClientAccountDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAccountDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientAccountDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
