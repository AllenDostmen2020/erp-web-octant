import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountCreatePageComponent } from './client-account-create-page.component';

describe('ClientAccountCreatePageComponent', () => {
  let component: ClientAccountCreatePageComponent;
  let fixture: ComponentFixture<ClientAccountCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAccountCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientAccountCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
