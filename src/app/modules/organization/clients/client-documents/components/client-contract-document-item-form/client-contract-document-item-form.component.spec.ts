import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContractDocumentItemFormComponent } from './client-contract-document-item-form.component';

describe('ClientContractDocumentItemFormComponent', () => {
  let component: ClientContractDocumentItemFormComponent;
  let fixture: ComponentFixture<ClientContractDocumentItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientContractDocumentItemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientContractDocumentItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
