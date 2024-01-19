import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerTemplateComponent } from './datepicker-template.component';

describe('DatepickerTemplateComponent', () => {
  let component: DatepickerTemplateComponent;
  let fixture: ComponentFixture<DatepickerTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DatepickerTemplateComponent]
    });
    fixture = TestBed.createComponent(DatepickerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
