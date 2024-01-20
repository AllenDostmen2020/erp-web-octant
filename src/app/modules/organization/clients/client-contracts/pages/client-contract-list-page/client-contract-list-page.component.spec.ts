import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContractListPageComponent } from './client-contract-list-page.component';

describe('ClientContractListPageComponent', () => {
  let component: ClientContractListPageComponent;
  let fixture: ComponentFixture<ClientContractListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientContractListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientContractListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
