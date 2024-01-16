import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteSurrenderBoxOpeningComponent } from './autocomplete-surrender-box-opening.component';

describe('AutocompleteSurrenderBoxOpeningComponent', () => {
  let component: AutocompleteSurrenderBoxOpeningComponent;
  let fixture: ComponentFixture<AutocompleteSurrenderBoxOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AutocompleteSurrenderBoxOpeningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteSurrenderBoxOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
