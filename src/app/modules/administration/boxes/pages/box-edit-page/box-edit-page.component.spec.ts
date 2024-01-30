import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxEditPageComponent } from './box-edit-page.component';

describe('BoxEditPageComponent', () => {
  let component: BoxEditPageComponent;
  let fixture: ComponentFixture<BoxEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
