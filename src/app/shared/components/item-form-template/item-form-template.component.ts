import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FetchService, RequestInitFetch, ToastForFetch } from '@service/fetch.service';
import { EventsService } from '@service/events.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SpinnerDefaultComponent } from '../spinner-default/spinner-default.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InputFileConfiguration, SelectFileComponent } from '../select-file/select-file.component';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { ActivatedRoute } from '@angular/router';
import { FetchErrorResponse } from 'src/app/shared/interfaces/fetch';
import { ErrorTemplateComponent } from '../error-template/error-template.component';
import { GetKeyItemPipe } from '@pipe/get-key-item.pipe';
import { ExecuteFunctionPipe } from '@pipe/execute-function.pipe';
import { GetMixedValuePipe } from '@pipe/get-mixed-value.pipe';
import { InputAutocompleteConfiguration, InputAutocompleteLocalConfiguration, InputAutocompleteServerConfiguration, InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectConfiguration, InputSelectLocalConfiguration, InputSelectServerConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { objectToURLSearchParams } from '@utility/queryParams';
import { ConfirmDialogData } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { NumbersOnlyDirective } from '@directive/numbers-only.directive';
import { CharactersOnlyDirective } from '@directive/characters-only.directive';

export interface ItemFormConfiguration<Item = any, Data = any> {
  title?: string;
  titleModule: string;

  subtitle?: ((item: Item) => string | number | null | undefined) | false;

  formGroup: FormGroup;
  type: 'create' | 'update';

  loading?: boolean;
  hiddeFields?: boolean;
  fields?: FormInput[];

  dataItem?: WritableSignal<Item | null>,

  server: {
      url: string;
      queryParams?: { [key: string]: string | number | boolean | null | undefined };
      updateUrl?: string;
      updateQueryParams?: { [key: string]: string | number | boolean | null | undefined };
      createUrl?: string;
      createQueryParams?: { [key: string]: string | number | boolean | null | undefined };
      itemUrl?: string;
      itemQueryParams?: { [key: string]: string | number | boolean | null | undefined };
      fetch?: {
        confirmDialog?: ConfirmDialogData,
        toast?: ToastForFetch,
      }
  }

  parseDataItemBeforeSendFormFn?: (data: Data) => (Data | Promise<Data>);
  afterSaveFormFn?: (data: Item) => void;

  itemId?: string | number
  parseItemBeforePatchFormFn?: (item: Item) => (Item | Promise<Item>);

  ignoreShowError?: boolean;
  interceptHttpErrorItemFn?: (error: FetchErrorResponse) => void;
  httpError?: FetchErrorResponse;

  disableAutoBackLocation?: boolean;

  saveButton?: {
      text: string;
      icon?: string;
      iconPosition?: 'left' | 'right';
  };
  
  cancelButton?: {
      iconPosition?: 'left' | 'right';
      text: string;
      icon?: string;
  } | false;
}

export declare type InputType = 'select' | 'select-local' | 'select-server' | 'date' | 'date-range' | 'text' | 'number' | 'textarea' | 'checkbox' | 'switch' | 'autocomplete' | 'autocomplete-local' | 'autocomplete-server';

export interface FormInput {

  type: InputType | 'file';

  text?: TextFormInput;

  number?: NumberFormInput;

  textarea?: TextareaFormInput;
  
  date?: DateFormInput;
  
  dateRange?: DateRangeFormInput;
  
  switch?: SwitchFormInput;
  
  checkbox?: CheckboxFormInput;

  select?: SelectConfigurationExt;

  selectLocal?: SelectLocalConfigurationExt;
  
  selectServer?: SelectServerConfigurationExt;

  autocomplete?: AutocompleteConfigurationExt;

  autocompleteServer?: AutocompleteServerConfigurationExt;

  autocompleteLocal?: AutocompleteLocalConfigurationExt;

  file?: FileFormInput;
}

export interface TextFormInput<T = any> {
  formControlName: string;
  textLabel: string;
  placeholder?: string;
  defaultValue?: string | number | null;
  minLength?: number;
  maxLength?: number;
  cssClass?: string | ((item: T) => string);
  validationOnly?: 'numbers' | 'letters' | 'numbersAndLetters';
}

export interface NumberFormInput<T = any> {
  formControlName: string;
  textLabel: string;
  placeholder?: string;
  defaultValue?: string | number | null;
  min?: number;
  max?: number;
  step?: number;
  cssClass?: string | ((item: T) => string);
}

export interface TextareaFormInput<T = any> {
  formControlName: string;
  textLabel: string;
  placeholder?: string;
  defaultValue?: string | number | null;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cssClass?: string | ((item: T) => string);
}

export interface SelectFormInput<T = any> {
  formControlName: string;
  textLabel: string;
  placeholder?: string;
  defaultValue?: string | number | boolean | null;
  options: { text: string, value: any }[];
  cssClass?: string | ((item: T) => string);
}

export interface DateFormInput<T = any> {
  formControlName: string;
  textLabel: string;
  placeholder?: string;
  defaultValue?: Date | string | number | null;
  min?: Date;
  max?: Date;
  cssClass?: string | ((item: T) => string);
}

export interface DateRangeFormInput<T = any> {
  formControlNameFrom: string;
  formControlNameTo: string;
  textLabel: string;
  placeholder?: string;
  defaultValueFrom?: Date | string | number | null;
  defaultValueTo?: Date | string | number | null;
  min?: Date;
  max?: Date;
  cssClass?: string | ((item: T) => string);
}

export interface SwitchFormInput<T = any> {
  formControlName: string;
  textLabel: string;
  defaultValue?: boolean | null;
  cssClass?: string | ((item: T) => string);
}

export interface CheckboxFormInput<T = any> {
  formControlName: string;
  textLabel: string;
  defaultValue?: boolean | null;
  cssClass?: string | ((item: T) => string);
}

interface SelectConfigurationExt<T = any> extends InputSelectConfiguration<T> {
  formControlName: string;
  defaultValue?: string | number | null;
  cssClass?: string | ((item: T) => string);
}

interface SelectLocalConfigurationExt<T = any> extends InputSelectLocalConfiguration<T> {
  formControlName: string;
  defaultValue?: string | number | null;
  cssClass?: string | ((item: T) => string);
}

interface SelectServerConfigurationExt<T = any> extends InputSelectServerConfiguration<T> {
  formControlName: string;
  defaultValue?: string | number | null;
  cssClass?: string | ((item: T) => string);
}

interface AutocompleteConfigurationExt<T = any> extends InputAutocompleteConfiguration<T> {
  formControlName: string;
  defaultValue?: string | number | null;
  cssClass?: string | ((item: T) => string);
}

interface AutocompleteLocalConfigurationExt<T = any> extends InputAutocompleteLocalConfiguration<T> {
  formControlName: string;
  defaultValue?: string | number | null;
  cssClass?: string | ((item: T) => string);
}

interface AutocompleteServerConfigurationExt<T = any> extends InputAutocompleteServerConfiguration<T> {
  formControlName: string;
  defaultValue?: string | number | null;
  cssClass?: string | ((item: T) => string);
}

export interface FileFormInput<T = any> extends InputFileConfiguration {
  formControlName: string;
  textLabel: string;
  defaultValue?: any;
  cssClass?: string | ((item: T) => string);
}

export const textFormInput = (configuration: TextFormInput): FormInput => ({
  type: 'text',
  text: configuration
});

export const numberFormInput = (configuration: NumberFormInput): FormInput => ({
  type: 'number',
  number: configuration
});

export const textareaFormInput = (configuration: TextareaFormInput): FormInput => ({
  type: 'textarea',
  textarea: configuration
});

export const selectFormInput = (configuration: SelectConfigurationExt): FormInput => ({
  type: 'select',
  select: configuration
});

export const selectLocalFormInput = (configuration: SelectLocalConfigurationExt): FormInput => ({
  type: 'select',
  select: configuration
});

export const selectServerFormInput = (configuration: SelectServerConfigurationExt): FormInput => ({
  type: 'select',
  select: configuration
});

export const dateFormInput = (configuration: DateFormInput): FormInput => ({
  type: 'date',
  date: configuration
});

export const dateRangeFormInput = (configuration: DateRangeFormInput): FormInput => ({
  type: 'date-range',
  dateRange: configuration
});

export const switchFormInput = (configuration: SwitchFormInput): FormInput => ({
  type: 'switch',
  switch: configuration
});

export const checkboxFormInput = (configuration: CheckboxFormInput): FormInput => ({
  type: 'checkbox',
  checkbox: configuration
});

export const autocompleteFormInput = (configuration: AutocompleteConfigurationExt): FormInput => ({
  type: 'autocomplete-local',
  autocomplete: configuration
});

export const autocompleteLocalFormInput = (configuration: AutocompleteLocalConfigurationExt): FormInput => ({
  type: 'autocomplete-local',
  autocompleteLocal: configuration
});

export const autocompleteServerFormInput = (configuration: AutocompleteServerConfigurationExt): FormInput => ({
  type: 'autocomplete-server',
  autocompleteServer: configuration
});

export const fileFormInput = (configuration: FileFormInput): FormInput => ({
  type: 'file',
  file: configuration
});


@Component({
  selector: 'app-item-form-template',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    SpinnerDefaultComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    SelectFileComponent,
    PathFilesServerPipe,
    ScrollingModule,
    ErrorTemplateComponent,
    GetKeyItemPipe,
    ExecuteFunctionPipe,
    GetMixedValuePipe,
    InputAutocompleteTemplateComponent,
    InputSelectTemplateComponent,
    NumbersOnlyDirective,
    CharactersOnlyDirective,
  ],
  templateUrl: './item-form-template.component.html',
  styleUrls: ['./item-form-template.component.css']
})
export class ItemFormTemplateComponent {
  @Input({ required: true }) configuration!: ItemFormConfiguration;

  private fetch = inject(FetchService);
  private events = inject(EventsService);
  private activatedRoute = inject(ActivatedRoute);
  public location = inject(Location);

  private abortController = new AbortController();

  ngOnInit() {
    if (this.configuration.type == 'update') {
      this.setItemId();
      if (this.configuration.dataItem && this.configuration.dataItem()) {
        this.configuration.loading = false;
      } else {
        this.configuration.dataItem = signal(null);
        this.getItem();
      }
    }
  }

  ngOnDestroy() {
    this.abortController.abort();
  }

  private setItemId() {
    if (!this.configuration.itemId) {
      if (this.activatedRoute.snapshot.paramMap.get('id')) {
        this.configuration.itemId = this.activatedRoute.snapshot.paramMap.get('id')!;
      }
    }
  }

  public getControl(name: string): FormControl {
    return this.configuration.formGroup.get(name) as FormControl;
  }

  public async submitForm() {
    try {
      const form = this.configuration.formGroup;
      form.markAllAsTouched();
      if (form.invalid || this.configuration.loading) return;
      this.configuration.loading = true;

      let data = form.getRawValue();
      const { parseDataItemBeforeSendFormFn } = this.configuration;
      data = await parseDataItemBeforeSendFormFn?.(data) ?? data;

      const requestInit: RequestInitFetch = { };
      if(this.configuration.server.fetch?.confirmDialog) {
        requestInit.confirmDialog = this.configuration.server.fetch.confirmDialog;
      }
      if(this.configuration.server.fetch?.toast) {
        requestInit.toast = this.configuration.server.fetch.toast;
      }

      let response = null;
      if (this.configuration.type === 'create') {
        response = await this.fetch.post(this.configuration.server.url, data, requestInit);
        this.events.emitEvent(`${this.configuration.server.url}_created`, response);
      } else {
        const url = this.configuration.server.updateUrl ?? `${this.configuration.server.url}/${this.configuration.dataItem!()?.id}`;
        response = await this.fetch.put(url, data, requestInit);
        this.events.emitEvent(`${this.configuration.server.url}_updated`, response);
      }

      const { afterSaveFormFn } = this.configuration;
      if (afterSaveFormFn) afterSaveFormFn(response);

      if (!this.configuration.disableAutoBackLocation) this.location.back();
    } catch { }
    this.configuration.loading = false;
  }

  public async getItem() {
    this.configuration.dataItem = signal(null)
    this.configuration.loading = true;
    try {
      const { itemId, server } = this.configuration;
      let queryParams:any = server.itemQueryParams ?? {};
      if (queryParams instanceof Object) {
        queryParams = objectToURLSearchParams(queryParams);
        queryParams = queryParams.toString();
      }
      const url = `${server.itemUrl ?? server.url}/${itemId}?${queryParams ? queryParams : ''}`;
      const requestInit: RequestInitFetch = { signal: this.abortController.signal };
      let item: any = await this.fetch.get(url, requestInit);
      const { parseItemBeforePatchFormFn } = this.configuration;
      item = await parseItemBeforePatchFormFn?.(item) ?? item;
      this.configuration.formGroup.patchValue(item);
      this.configuration.dataItem.set(item);
      this.configuration.hiddeFields = false;
    } catch (error) {
      this.configuration.httpError = error as FetchErrorResponse;
      const { interceptHttpErrorItemFn } = this.configuration;
      if (interceptHttpErrorItemFn) interceptHttpErrorItemFn(this.configuration.httpError);
    }
    this.configuration.loading = false;
  }
}

