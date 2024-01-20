import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListPageComponent } from './document-list-page.component';

describe('DocumentListPageComponent', () => {
  let component: DocumentListPageComponent;
  let fixture: ComponentFixture<DocumentListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
