import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogTemplateComponent } from './confirm-dialog-template.component';

describe('ConfirmDialogTemplateComponent', () => {
  let component: ConfirmDialogTemplateComponent;
  let fixture: ComponentFixture<ConfirmDialogTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmDialogTemplateComponent]
    });
    fixture = TestBed.createComponent(ConfirmDialogTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
