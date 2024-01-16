import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemViewTemplateComponent } from './item-view-template.component';

describe('ItemViewTemplateComponent', () => {
  let component: ItemViewTemplateComponent;
  let fixture: ComponentFixture<ItemViewTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ItemViewTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
