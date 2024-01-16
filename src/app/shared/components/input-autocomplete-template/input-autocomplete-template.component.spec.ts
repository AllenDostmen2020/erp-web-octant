import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutocompleteTemplateComponent } from './input-autocomplete-template.component';

describe('InputAutocompleteTemplateComponent', () => {
  let component: InputAutocompleteTemplateComponent;
  let fixture: ComponentFixture<InputAutocompleteTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAutocompleteTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputAutocompleteTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
