import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCountryDetailPageComponent } from './code-country-detail-page.component';

describe('CodeCountryDetailPageComponent', () => {
  let component: CodeCountryDetailPageComponent;
  let fixture: ComponentFixture<CodeCountryDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeCountryDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeCountryDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
