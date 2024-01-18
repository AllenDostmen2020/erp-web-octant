import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEditPageComponent } from './plan-edit-page.component';

describe('PlanEditPageComponent', () => {
  let component: PlanEditPageComponent;
  let fixture: ComponentFixture<PlanEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
