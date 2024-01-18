import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCreatePageComponent } from './plan-create-page.component';

describe('PlanCreatePageComponent', () => {
  let component: PlanCreatePageComponent;
  let fixture: ComponentFixture<PlanCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
