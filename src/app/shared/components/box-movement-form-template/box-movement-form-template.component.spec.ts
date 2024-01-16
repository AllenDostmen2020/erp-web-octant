import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMovementFormTemplateComponent } from './box-movement-form-template.component';

describe('BoxMovementFormTemplateComponent', () => {
  let component: BoxMovementFormTemplateComponent;
  let fixture: ComponentFixture<BoxMovementFormTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxMovementFormTemplateComponent]
    });
    fixture = TestBed.createComponent(BoxMovementFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
