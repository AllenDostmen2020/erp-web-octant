import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditPageComponent } from './document-edit-page.component';

describe('DocumentEditPageComponent', () => {
  let component: DocumentEditPageComponent;
  let fixture: ComponentFixture<DocumentEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
