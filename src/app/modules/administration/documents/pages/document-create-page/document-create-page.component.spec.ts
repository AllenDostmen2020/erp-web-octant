import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreatePageComponent } from './document-create-page.component';

describe('DocumentCreatePageComponent', () => {
  let component: DocumentCreatePageComponent;
  let fixture: ComponentFixture<DocumentCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
