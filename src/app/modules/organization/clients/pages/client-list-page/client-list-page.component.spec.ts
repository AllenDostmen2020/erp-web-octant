import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListPageComponent } from './client-list-page.component';

describe('ClientListPageComponent', () => {
  let component: ClientListPageComponent;
  let fixture: ComponentFixture<ClientListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
