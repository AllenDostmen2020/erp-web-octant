import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxViewPageComponent } from './box-view-page.component';

describe('BoxViewPageComponent', () => {
  let component: BoxViewPageComponent;
  let fixture: ComponentFixture<BoxViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
