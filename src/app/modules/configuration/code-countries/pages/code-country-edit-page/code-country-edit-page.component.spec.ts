import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCountryEditPageComponent } from './code-country-edit-page.component';

describe('CodeCountryEditPageComponent', () => {
  let component: CodeCountryEditPageComponent;
  let fixture: ComponentFixture<CodeCountryEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeCountryEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeCountryEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
