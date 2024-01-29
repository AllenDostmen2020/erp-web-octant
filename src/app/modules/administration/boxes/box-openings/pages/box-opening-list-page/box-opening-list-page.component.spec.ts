import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxOpeningListPageComponent } from './box-opening-list-page.component';

describe('BoxOpeningListPageComponent', () => {
  let component: BoxOpeningListPageComponent;
  let fixture: ComponentFixture<BoxOpeningListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxOpeningListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxOpeningListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
