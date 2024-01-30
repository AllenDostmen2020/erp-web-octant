import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxFormPageComponent } from './box-form-page.component';

describe('BoxFormPageComponent', () => {
  let component: BoxFormPageComponent;
  let fixture: ComponentFixture<BoxFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
