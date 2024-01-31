import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDocumentListComponent } from './client-document-list.component';

describe('ClientDocumentListComponent', () => {
  let component: ClientDocumentListComponent;
  let fixture: ComponentFixture<ClientDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDocumentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
