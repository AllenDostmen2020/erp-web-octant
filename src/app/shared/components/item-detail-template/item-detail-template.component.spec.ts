import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailTemplateComponent } from './item-detail-template.component';

describe('ItemDetailTemplateComponent', () => {
  let component: ItemDetailTemplateComponent;
  let fixture: ComponentFixture<ItemDetailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ItemDetailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDetailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
