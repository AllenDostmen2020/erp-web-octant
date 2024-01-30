import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxOpeningCreatePageComponent } from './box-opening-create-page.component';

describe('BoxOpeningCreatePageComponent', () => {
  let component: BoxOpeningCreatePageComponent;
  let fixture: ComponentFixture<BoxOpeningCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxOpeningCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxOpeningCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
