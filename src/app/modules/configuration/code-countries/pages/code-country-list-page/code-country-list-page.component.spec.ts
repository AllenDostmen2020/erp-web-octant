import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCountryListPageComponent } from './code-country-list-page.component';

describe('CodeCountryListPageComponent', () => {
  let component: CodeCountryListPageComponent;
  let fixture: ComponentFixture<CodeCountryListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeCountryListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeCountryListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
