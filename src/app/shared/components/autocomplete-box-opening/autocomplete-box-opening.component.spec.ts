import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteBoxOpeningComponent } from './autocomplete-box-opening.component';

describe('AutocompleteBoxOpeningComponent', () => {
  let component: AutocompleteBoxOpeningComponent;
  let fixture: ComponentFixture<AutocompleteBoxOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteBoxOpeningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutocompleteBoxOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
