import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDocumentCreateComponent } from './client-document-create.component';

describe('ClientDocumentCreateComponent', () => {
  let component: ClientDocumentCreateComponent;
  let fixture: ComponentFixture<ClientDocumentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDocumentCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientDocumentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
