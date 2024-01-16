import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarTemplateComponent } from './snackbar-template.component';

describe('SnackbarTemplateComponent', () => {
  let component: SnackbarTemplateComponent;
  let fixture: ComponentFixture<SnackbarTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SnackbarTemplateComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
