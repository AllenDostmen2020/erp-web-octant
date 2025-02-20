import { NgStyle } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NavigateLateralPanelOutletDirective } from '@directive/navigate-lateral-panel-outlet.directive';
import { FetchErrorType } from '@interface/fetch';
import { PaginatorData } from '@interface/paginator';
import { GetMixedValuePipe } from '@pipe/get-mixed-value.pipe';
import { DatabaseStorageService, NameModuleDatabase } from "@service/database-storage.service";
import { FetchService } from '@service/fetch.service';
import { objectToURLSearchParams } from '@utility/queryParams';
import { debounceTime, tap } from 'rxjs/operators';

export interface InputAutocompleteConfiguration<T = any> {
  textLabel: string;
  placeholder?: string;
  cssClassOption?: string | ((item: T) => string);
  cssStyleOption?: ({ [key: string]: any }) | ((item: T) => ({ [key: string]: any }));
  disableOptionFn?: (item: T) => boolean;
  conditionFilterFn?: (item: T, value: string) => boolean;
  displayValueFn?: (item: T) => string | number | { [key: string]: any };
  displayTextFn?: (item: T) => string | number;
  optionDisplayTextFn?: (item: T) => string | number;
  parseDataFn?: (data: T[]) => (T[] | Promise<T[]>);
  data?: WritableSignal<T[]>;
  initializeData?: boolean;
  addButton?: RouterLinkInputAutocomplete;
}

export interface InputAutocompleteServerConfiguration<T = any> extends InputAutocompleteConfiguration<T> {
  server: {
    url: string;
    searchKey?: string;
    queryParams?: string | { [key: string]: any };
  }
}

export interface InputAutocompleteLocalConfiguration<T = any> extends InputAutocompleteConfiguration<T> {
  local: {
    readonly nameModuleDatabase: NameModuleDatabase;
  }
}

export interface ButtonAddInputAutocomplete {
  label?: string;
  routerLink: string;
  function?: () => void;
  outlet: 'route-lateral' | 'principal';
}

interface RouterLinkInputAutocomplete {
  url: string;
  outlet?: 'route-lateral' | 'principal';
  queryParams?: { [key: string]: any },
  state?: any
}
@Component({
  selector: 'app-input-autocomplete-template',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    GetMixedValuePipe,
    NavigateLateralPanelOutletDirective,
    RouterLink,
  ],
  templateUrl: './input-autocomplete-template.component.html',
  styleUrl: './input-autocomplete-template.component.scss'
})
export class InputAutocompleteTemplateComponent {
  @Input({ required: true }) configuration!: InputAutocompleteConfiguration | InputAutocompleteLocalConfiguration | InputAutocompleteServerConfiguration;
  @Input({ required: true }) idControl!: FormControl;
  @Input() autocompleteControl: FormControl = new FormControl();

  @ViewChild('inputHtml', { static: true })
  inputHtml!: ElementRef<HTMLInputElement>;

  private databaseStorage = inject(DatabaseStorageService);
  private fetch = inject(FetchService);
  private renderer = inject(Renderer2);

  public filterData: WritableSignal<any[]> = signal([]);
  public loading: WritableSignal<boolean> = signal(false);
  public init: WritableSignal<boolean> = signal(false);
  private abortController = new AbortController();
  private timeoutId?: any;

  get conditionFilterFn(): (item: any, value: string) => boolean {
    return this.configuration.conditionFilterFn ?? ((item, value) => (item.name ?? '').trim().toLowerCase().includes(value.trim().toLowerCase()));
  }

  ngOnInit(): void {
    if ((this.configuration as InputAutocompleteLocalConfiguration).local) {
      if (this.idControl.value) {
        this.findLocalItem(this.idControl.value);
      };
    }
    if (this.configuration.initializeData) {
      this.init.set(true);
      if (this.configuration.data) this.getItemsFromData('');
      else if ((this.configuration as InputAutocompleteLocalConfiguration).local) this.getItemsLocal('');
      else if ((this.configuration as InputAutocompleteServerConfiguration).server) this.getItemsServer('');
    }
    this.idControl.valueChanges.subscribe((value) => {
      if (value === null || value === undefined) this.clearInput();
    });
    this.autocompleteControl.valueChanges.pipe(tap(() => this.loading.set(true)), debounceTime(250))
      .subscribe((data: (string | { [key: string]: any })) => {
        this.init.set(true);
        if (data instanceof Object) {
          const value = this.configuration.displayValueFn ? this.configuration.displayValueFn(data) : data['id'];
          this.idControl.setValue(value, { emitEvent: false });
          this.renderer.setAttribute(this.inputHtml.nativeElement, 'readonly', 'readonly');
        } else if (data?.trim()) {
          if (this.idControl.value) this.idControl.setValue(null, { emitEvent: false });
          if (this.configuration.data) this.getItemsFromData(data);
          else if ((this.configuration as InputAutocompleteLocalConfiguration).local) this.getItemsLocal(data);
          else if ((this.configuration as InputAutocompleteServerConfiguration).server) this.getItemsServer(data);
        } else {
          this.filterData.set([]);
          this.loading.set(false);
          this.init.set(false);
        }
      });
  }

  private async findLocalItem(value: number | string): Promise<void> {
    const data = await this.databaseStorage.getData<any>((this.configuration as InputAutocompleteLocalConfiguration).local!.nameModuleDatabase);
    const item = data.find((item) => {
      const id = this.configuration.displayValueFn ? this.configuration.displayValueFn(data) : item['id']
      return id == value
    });
    this.autocompleteControl.setValue(item);
  }

  private async getItemsFromData(value: string): Promise<void> {
    let data = this.configuration.data!()!;
    const { parseDataFn } = this.configuration;
    if (parseDataFn) data = await parseDataFn(data);
    this.filterData.set(data.filter((item) => this.conditionFilterFn(item, value)));
    this.loading.set(false);
  }

  private async getItemsLocal(value: string): Promise<void> {
    const { nameModuleDatabase } = (this.configuration as InputAutocompleteLocalConfiguration).local!;
    let data = await this.databaseStorage.getData(nameModuleDatabase);
    const { parseDataFn } = this.configuration;
    if (parseDataFn) data = await parseDataFn(data);
    this.filterData.set(data.filter((item) => this.conditionFilterFn(item, value)));
    this.loading.set(false);
  }

  private async getItemsServer(value: string): Promise<void> {
    if (this.loading()) {
      this.abortController.abort();
      this.abortController = new AbortController();
    }
    this.loading.set(true);
    const { url, searchKey } = (this.configuration as InputAutocompleteServerConfiguration).server!;
    let queryParams = (this.configuration as InputAutocompleteServerConfiguration).server!.queryParams ?? {};
    if (queryParams instanceof Object) {
      queryParams = objectToURLSearchParams(queryParams);
      queryParams = queryParams.toString();
    }
    try {
      const endpoint = `${url}?${searchKey ?? 'search'}=${value}&${queryParams ? queryParams : ''}`;
      const response = await this.fetch.get<PaginatorData<any> | any[]>(endpoint, { signal: this.abortController.signal });
      let data = response instanceof Array ? response : response.data;
      const { parseDataFn } = this.configuration;
      if (parseDataFn) data = await parseDataFn(data);
      this.filterData.set(data);
      this.loading.set(false);
    } catch (error: any) {
      if (error.name != FetchErrorType.ABORT) this.loading.set(false);
    }
    this.loading.set(false);
  }

  public displayFn = (value: any) => {
    return value instanceof Object ? value.name : ''
  }

  public clearInput() {
    this.autocompleteControl.setValue(null);
    this.idControl.setValue(null, { emitEvent: false });
    this.renderer.removeAttribute(this.inputHtml.nativeElement, 'readonly');
  }

  public blurInput(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      if (!(this.autocompleteControl.value instanceof Object) && this.autocompleteControl.value) {
        this.autocompleteControl.setValue(null)
      }
    }, 250)
  }

}

