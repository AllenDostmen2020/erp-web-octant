import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCountryCreatePageComponent } from './code-country-create-page.component';

describe('CodeCountryCreatePageComponent', () => {
  let component: CodeCountryCreatePageComponent;
  let fixture: ComponentFixture<CodeCountryCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeCountryCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeCountryCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
