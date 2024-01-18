import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDetailPageComponent } from './plan-detail-page.component';

describe('PlanDetailPageComponent', () => {
  let component: PlanDetailPageComponent;
  let fixture: ComponentFixture<PlanDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
