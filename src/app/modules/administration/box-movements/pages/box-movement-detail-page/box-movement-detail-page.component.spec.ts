import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMovementDetailPageComponent } from './box-movement-detail-page.component';

describe('BoxMovementDetailPageComponent', () => {
  let component: BoxMovementDetailPageComponent;
  let fixture: ComponentFixture<BoxMovementDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxMovementDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxMovementDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
