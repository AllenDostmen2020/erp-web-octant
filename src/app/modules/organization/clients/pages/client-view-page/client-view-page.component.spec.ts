import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewPageComponent } from './client-view-page.component';

describe('ClientViewPageComponent', () => {
  let component: ClientViewPageComponent;
  let fixture: ComponentFixture<ClientViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
