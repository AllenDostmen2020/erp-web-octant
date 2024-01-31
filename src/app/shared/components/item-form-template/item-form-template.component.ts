import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ItemFormConfiguration } from 'src/app/shared/interfaces/itemForm';
import { FetchService } from '@service/fetch.service';
import { EventsService } from '@service/events.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SpinnerDefaultComponent } from '../spinner-default/spinner-default.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SelectFileComponent } from '../select-file/select-file.component';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { ActivatedRoute } from '@angular/router';
import { FetchErrorResponse, RequestInitFetch } from 'src/app/shared/interfaces/fetch';
import { ErrorTemplateComponent } from '../error-template/error-template.component';
import { GetKeyItemPipe } from '@pipe/get-key-item.pipe';
import { ExecuteFunctionPipe } from '@pipe/execute-function.pipe';
import { GetMixedValuePipe } from '@pipe/get-mixed-value.pipe';
import { InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { objectToURLSearchParams } from '@utility/queryParams';

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

      let response = null;
      if (this.configuration.type === 'create') {
        response = await this.fetch.post(this.configuration.server.url, data);
        this.events.emitEvent(`${this.configuration.server.url}_created`, response);
      } else {
        const url = this.configuration.server.updateUrl ?? `${this.configuration.server.url}/${this.configuration.dataItem!()?.id}`;
        response = await this.fetch.put(url, data);
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

