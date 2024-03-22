import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelCodeFormFieldTemplateComponent } from './tel-code-form-field-template.component';

describe('TelCodeFormFieldTemplateComponent', () => {
  let component: TelCodeFormFieldTemplateComponent;
  let fixture: ComponentFixture<TelCodeFormFieldTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelCodeFormFieldTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelCodeFormFieldTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
