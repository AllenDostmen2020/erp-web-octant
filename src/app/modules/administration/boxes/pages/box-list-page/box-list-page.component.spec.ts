import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxListPageComponent } from './box-list-page.component';

describe('BoxListPageComponent', () => {
  let component: BoxListPageComponent;
  let fixture: ComponentFixture<BoxListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
