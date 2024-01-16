import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectTemplateComponent } from './input-select-template.component';

describe('InputSelectTemplateComponent', () => {
  let component: InputSelectTemplateComponent;
  let fixture: ComponentFixture<InputSelectTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSelectTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputSelectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
