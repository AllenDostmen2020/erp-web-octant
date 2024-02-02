import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMovementListPageComponent } from './box-movement-list-page.component';

describe('BoxMovementListPageComponent', () => {
  let component: BoxMovementListPageComponent;
  let fixture: ComponentFixture<BoxMovementListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxMovementListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxMovementListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
