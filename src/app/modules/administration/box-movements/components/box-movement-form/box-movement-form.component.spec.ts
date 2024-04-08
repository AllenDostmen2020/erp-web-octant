import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMovementFormComponent } from './box-movement-form.component';

describe('BoxMovementFormComponent', () => {
  let component: BoxMovementFormComponent;
  let fixture: ComponentFixture<BoxMovementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxMovementFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxMovementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
