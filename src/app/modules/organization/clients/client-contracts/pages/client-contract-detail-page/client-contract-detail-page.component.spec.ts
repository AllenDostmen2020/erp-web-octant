import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContractDetailPageComponent } from './client-contract-detail-page.component';

describe('ClientContractDetailPageComponent', () => {
  let component: ClientContractDetailPageComponent;
  let fixture: ComponentFixture<ClientContractDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientContractDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientContractDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
