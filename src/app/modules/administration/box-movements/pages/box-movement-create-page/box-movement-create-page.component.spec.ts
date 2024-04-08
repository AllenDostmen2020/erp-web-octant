import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMovementCreatePageComponent } from './box-movement-create-page.component';

describe('BoxMovementCreatePageComponent', () => {
  let component: BoxMovementCreatePageComponent;
  let fixture: ComponentFixture<BoxMovementCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxMovementCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxMovementCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
