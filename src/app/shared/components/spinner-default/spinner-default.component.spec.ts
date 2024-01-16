import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerDefaultComponent } from './spinner-default.component';

describe('SpinnerDefaultComponent', () => {
  let component: SpinnerDefaultComponent;
  let fixture: ComponentFixture<SpinnerDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SpinnerDefaultComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
