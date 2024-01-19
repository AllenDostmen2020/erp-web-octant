import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { DatePipe, NgIf } from '@angular/common';
import { MyDateAdapter } from '@utility/myDateAdapter';
import { MY_DATE_FORMATS } from '@utility/myDateFormat';

export interface ConfigurationDatepickerTemplate {
  label: string;
  placeholder?: string;
  min?: Date | null | undefined;
  max?: Date | null | undefined;
}

@Component({
  selector: 'app-datepicker-template',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './datepicker-template.component.html',
  styleUrls: ['./datepicker-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MyDateAdapter,
      deps: [DateFnsAdapter],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatepickerTemplateComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DatepickerTemplateComponent,
      multi: true,
    },
  ],
})
export class DatepickerTemplateComponent implements ControlValueAccessor, Validator {
  @Input({ required: true }) configuration!: ConfigurationDatepickerTemplate;

  private onChangefn!: Function;
  private onTouchedfn!: Function;
  public formCtrl = new FormControl();
  private required = false;

  ngAfterViewInit() {
    this.formCtrl.valueChanges.subscribe((value) => {
      this.onChangefn(value);
    });
  }

  writeValue(value: any): void {
    this.formCtrl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChangefn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedfn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.formCtrl.disable({ emitEvent: false })
      : this.formCtrl.enable({ emitEvent: false });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.hasValidator(Validators.required) != this.required) this.setRequiredCtrl(control.hasValidator(Validators.required));
    return null;
  }

  private setRequiredCtrl(required: boolean) {
    if (required) this.formCtrl.setValidators([Validators.required]);
    else this.formCtrl.setValidators([]);
    this.formCtrl.updateValueAndValidity({ emitEvent: false });
  }


}
