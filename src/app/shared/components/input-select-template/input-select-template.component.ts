import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PaginatorData } from 'src/app/shared/interfaces/paginator';
import { GetMixedValuePipe } from '@pipe/get-mixed-value.pipe';
import { DatabaseStorageService } from '@service/database-storage.service';
import { FetchService } from '@service/fetch.service';
import { objectToURLSearchParams } from '@utility/queryParams';

import { NameModuleDatabase } from "@service/database-storage.service";
import { NavigateLateralPanelOutletDirective } from '@directive/navigate-lateral-panel-outlet.directive';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

export interface InputSelectConfiguration<T = any> {
  textLabel: string;
  placeholder?: string;
  cssClassOption?: string | ((item: T) => string);
  cssStyleOption?: ({ [key: string]: any }) | ((item: T) => ({ [key: string]: any }));
  disableOptionFn?: (item: T) => boolean;
  displayValueFn?: (item: T) => string | number | { [key: string]: any };
  displayTextFn?: (item: T) => string | number;
  parseDataFn?: (data: T[]) => (T[] | Promise<T[]>);
  data?: WritableSignal<T[]>;
  addButton?: ButtonAddInputSelect;
}

export interface InputSelectServerConfiguration<T = any> extends InputSelectConfiguration<T> {
  server: {
    url: string;
    queryParams?: string | { [key: string]: any };
  }
}

export interface InputSelectLocalConfiguration<T = any> extends InputSelectConfiguration<T> {
  local: {
    nameModuleDatabase: NameModuleDatabase;
  }
}

interface ButtonAddInputSelect {
  url: string;
  outlet?: 'route-lateral' | 'principal';
  queryParams?: { [key: string]: any },
  state?: any
}
@Component({
  selector: 'app-input-select-template',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    MatFormFieldModule,
    MatSelectModule,
    GetMixedValuePipe,
    NavigateLateralPanelOutletDirective,
    RouterLink,
  ],
  templateUrl: './input-select-template.component.html',
  styleUrl: './input-select-template.component.scss'
})
export class InputSelectTemplateComponent {
  @Input({ required: true }) public configuration!: InputSelectServerConfiguration | InputSelectConfiguration | InputSelectLocalConfiguration;
  @Input({ required: true }) public control!: FormControl;
  private fetch = inject(FetchService);
  private databaseStorage = inject(DatabaseStorageService);
  private abortController = new AbortController();
  public loading:WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    if (!this.configuration.data) {
      this.configuration.data = signal([]);
      this.getData();
    }
  }

  ngOnDestroy(): void {
    this.abortController.abort();
  }

  get data() {
    return this.configuration.data!;
  }

  private getData() {
    if ((this.configuration as InputSelectServerConfiguration).server) {
      this.getItemsServer();
    } else if ((this.configuration as InputSelectLocalConfiguration).local) {
      this.getItemsLocal();
    }
  }

  private async getItemsServer(): Promise<void> {
    const { url } = (this.configuration as InputSelectServerConfiguration).server!;
    let queryParams = (this.configuration as InputSelectServerConfiguration).server!.queryParams ?? {};
    if (queryParams instanceof Object) {
      queryParams = objectToURLSearchParams(queryParams);
      queryParams = queryParams.toString();
    }
    const endpoint = `${url}?${queryParams ? queryParams : ''}`;
    const response = await this.fetch.get<PaginatorData<any> | any[]>(endpoint, { signal: this.abortController.signal });
    const data = response instanceof Array ? response : response.data
    const { parseDataFn } = this.configuration;
    this.configuration.data?.set(parseDataFn ? await parseDataFn(data) : data);
  }

  private async getItemsLocal(): Promise<void> {
    const response = await this.databaseStorage.getData((this.configuration as InputSelectLocalConfiguration).local!.nameModuleDatabase);
    const { parseDataFn } = this.configuration;
    this.configuration.data?.set(parseDataFn ? await parseDataFn(response) : response);
  }
  
}

