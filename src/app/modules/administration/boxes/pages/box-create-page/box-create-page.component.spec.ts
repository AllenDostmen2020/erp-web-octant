import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCreatePageComponent } from './box-create-page.component';

describe('BoxCreatePageComponent', () => {
  let component: BoxCreatePageComponent;
  let fixture: ComponentFixture<BoxCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
