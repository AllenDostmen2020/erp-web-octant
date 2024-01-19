import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountListPageComponent } from './client-account-list-page.component';

describe('ClientAccountListPageComponent', () => {
  let component: ClientAccountListPageComponent;
  let fixture: ComponentFixture<ClientAccountListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAccountListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientAccountListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
