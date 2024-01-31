import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDocumentContractAddComponent } from './client-document-contract-add.component';

describe('ClientDocumentContractAddComponent', () => {
  let component: ClientDocumentContractAddComponent;
  let fixture: ComponentFixture<ClientDocumentContractAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDocumentContractAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientDocumentContractAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
