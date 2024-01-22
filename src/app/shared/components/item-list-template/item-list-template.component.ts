import { CommonModule, DatePipe, Location, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, Input, ContentChild, TemplateRef, ElementRef, Renderer2, ViewEncapsulation, signal, WritableSignal, computed, inject, Inject, Optional } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FetchService } from '@service/fetch.service';
import { objectToURLSearchParams } from 'src/app/shared/utilities/queryParams';
import { Subject, takeUntil } from 'rxjs';
import { IndexListPipe } from '@pipe/index-list.pipe';
import { SpinnerDefaultComponent } from '@component/spinner-default/spinner-default.component';
import { GetKeyItemPipe } from '@pipe/get-key-item.pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DiffDatePipe } from '@pipe/diff-date.pipe';
import { PaginatorData } from 'src/app/shared/interfaces/paginator';
import { EventsService } from '@service/events.service';
import { ItemListConfiguration, KEY_GET_ITEMS_PAGINATOR_LIST, KEY_GET_TOTAL_ITEMS_PAGINATOR_LIST, DATA_TYPE_LIST } from 'src/app/shared/interfaces/itemList';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HiddenOptionButtonRowPipe } from '@pipe/hidden-option-button-row.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GetUserByIdPipe } from '@pipe/get-user-by-id.pipe';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { ListFormatPipe } from '@pipe/list-format.pipe';
import { LoadImagePrivateDirective } from '@directive/load-image-private.directive';
import { FirstLetterUppercasePipe } from '@pipe/first-letter-uppercase.pipe';
import { NavigateLateralPanelOutletDirective } from '@directive/navigate-lateral-panel-outlet.directive';
import { FetchErrorType } from 'src/app/shared/interfaces/fetch';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { ExecuteFunctionPipe } from '@pipe/execute-function.pipe';
import { GetMixedValuePipe } from '@pipe/get-mixed-value.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormInput, dateRangeFormInput, switchFormInput } from 'src/app/shared/interfaces/itemForm';
import { InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { EventGlobalSearch, NAME_EVENT_GLOBAL_SEARCH } from 'src/app/sidenav/sidenav/sidenav.component';

export const defaultListFilterInputs = (): FormInput[] => [
  dateRangeFormInput({
    textLabel: 'Fecha de creación',
    formControlNameFrom: 'created_at_from',
    formControlNameTo: 'created_at_to',
  }),
  dateRangeFormInput({
    textLabel: 'Fecha de actualización',
    formControlNameFrom: 'updated_at_from',
    formControlNameTo: 'updated_at_to',
  }),
  switchFormInput({
    textLabel: 'Registros inactivos',
    formControlName: 'inactive',
  }),
];

@Component({
  selector: 'app-item-list-template',
  standalone: true,
  templateUrl: './item-list-template.component.html',
  styleUrls: ['./item-list-template.component.scss'],
  imports: [
    CommonModule,
    SpinnerDefaultComponent,
    ReactiveFormsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSortModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatPseudoCheckboxModule,
    IndexListPipe,
    GetKeyItemPipe,
    ReactiveFormsModule,
    RouterLink,
    DiffDatePipe,
    HiddenOptionButtonRowPipe,
    NgOptimizedImage,
    ScrollingModule,
    GetUserByIdPipe,
    PathFilesServerPipe,
    ListFormatPipe,
    LoadImagePrivateDirective,
    FirstLetterUppercasePipe,
    NavigateLateralPanelOutletDirective,
    ExecuteFunctionPipe,
    GetMixedValuePipe,
    InputAutocompleteTemplateComponent,
    InputSelectTemplateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // DatePipe,
    FirstLetterUppercasePipe,
    GetKeyItemPipe,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ItemListTemplateComponent {
  @Input({ required: true }) configuration!: ItemListConfiguration;

  // @ContentChild('headers') headers!: TemplateRef<any>;
  @ContentChild('rowList') rowList!: TemplateRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('divListItems', { static: true }) private divList!: ElementRef;

  private _dataTypeList: 'array' | 'paginator' = 'array';
  private _keyForGetItems: string;
  private _keyForGetTotalItems: string;

  private fetch = inject(FetchService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private renderer = inject(Renderer2);
  private eventsService = inject(EventsService);
  public location = inject(Location);

  // private datePipe = inject(DatePipe);
  public firstLetterUppercasePipe = inject(FirstLetterUppercasePipe);
  public getKeyItemPipe = inject(GetKeyItemPipe);

  public lengthData = computed(() => this.data().length)

  public searchCtrl: FormControl = new FormControl('');
  public formFilters: FormGroup<any> | null = null;

  public loading = signal(true);
  public font: WritableSignal<'small' | 'medium' | 'large'> = signal('medium');
  public headerListStyle: WritableSignal<'simple' | 'color'> = signal('simple');

  private abortController = new AbortController();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    @Optional() @Inject(DATA_TYPE_LIST) _dataTypeList: 'array' | 'paginator',
    @Optional() @Inject(KEY_GET_ITEMS_PAGINATOR_LIST) _keyForGetItems: string,
    @Optional() @Inject(KEY_GET_TOTAL_ITEMS_PAGINATOR_LIST) _keyForGetTotalItems: string
  ) {
    this._dataTypeList = _dataTypeList ?? 'paginator';
    this._keyForGetItems = _keyForGetItems || 'data';
    this._keyForGetTotalItems = _keyForGetTotalItems || 'total';
  }

  get data(): WritableSignal<any[]> {
    return this.configuration.data!;
  }

  get defaultOrder(): string {
    return this.configuration.defaultOrder ?? 'id|desc';
  }

  get dataTypeList(): 'array' | 'paginator' {
    return this.configuration.dataType ?? this._dataTypeList;
  }

  get keyForGetItems(): string {
    return this.configuration.keyGetItemsPaginator ?? this._keyForGetItems;
  }

  get keyForGetTotalItems(): string {
    return this.configuration.keyGetTotalItemsPaginator ?? this._keyForGetTotalItems;
  }

  ngOnInit(): void {
    this.configuration.data = signal([]);
    this.generateFormControlsFromFilterInputs();
    this.generateColumnsCss();

    this.eventsService
      .eventsFiltered<EventGlobalSearch>([NAME_EVENT_GLOBAL_SEARCH])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ data }: any) => {
        const type = data.type;
        if (type == 'enter') this.searchCtrl.setValue(data.value);
      })

  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 20;

    this.verifyQueryParams();

    this.activatedRoute.queryParams.subscribe(() => this.callGetData());

    this.sort.sortChange.subscribe(({active, direction}) => {
      const queryParams = this.getQueryParams();
      if(this.defaultOrder == `${active}|${direction}` || !active || !direction) queryParams['order'] = null;
      else queryParams['order'] = `${active}|${direction}`;
      this.navigateOrCallGetData(queryParams);
    });

    this.searchCtrl.valueChanges.pipe(debounceTime(250)).subscribe((value: string) => {
      const queryParams = this.getQueryParams();
      if(value) queryParams['search'] = value;
      else queryParams['search'] = null;
      this.navigateOrCallGetData(queryParams);
    });

    this.paginator.page.subscribe(({pageIndex, pageSize})=> {
      const queryParams = this.getQueryParams();
      if(pageIndex == 0 || (queryParams['page'] ?? null) == pageIndex + 1) queryParams['page'] = null;
      else queryParams['page'] = pageIndex + 1;
      if(pageSize == 20 || (queryParams['per_page'] ?? null) == pageSize) queryParams['per_page'] = null;
      else queryParams['per_page'] = pageSize;
      this.navigateOrCallGetData(queryParams);
    });

    this.configuration.updateListEvent?.subscribe(() => this.callGetData());

    this.eventsService
      .eventsFiltered([
        `${this.configuration.serverUrl}_created`,
        `${this.configuration.serverUrl}_updated`
      ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.callGetData());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    if (this.abortController) this.abortController.abort();
  }

  /* ---------------------------------------------------------------- */
  /* ---------------------------------------------------------------- */
  private async generateColumnsCss(): Promise<void> {
    const grid_cols: string[] = [];
    if (this.configuration.selectable) grid_cols.push('auto');
    if (!this.configuration.hideIndexColumn) grid_cols.push('auto');
    for await (const column of this.configuration.columns()) {
      if (!column.hidden) grid_cols.push(column.gridColumn ?? 'auto');
    }
    if (!this.configuration.hideOptionsColumn) grid_cols.push('auto');
    if (this.configuration.actionButtons) grid_cols.push('auto');
    this.renderer.setStyle(this.divList.nativeElement, 'grid-template-columns', grid_cols.join(' '));
  }

  /* ---------------------------------------------------------------- */
  /* ---------------------------------------------------------------- */
  private getQueryParams(): { [key: string]: any } {
    return !this.configuration.disableFiltersInQueryParams ? JSON.parse(JSON.stringify(this.activatedRoute.snapshot.queryParams)) : {
      ...this.formFilters?.value ?? {},
      page: this.paginator.pageIndex + 1,
      per_page: this.paginator.pageSize,
      order: this.sort.active ? `${this.sort.active}|${this.sort.direction}` : null,
      search: this.searchCtrl.value ? this.searchCtrl.value : null,
    }
  }

  private navigateOrCallGetData(params: any): void {
    if(this.configuration.disableFiltersInQueryParams) this.callGetData(params);
    else this.router.navigate([], { queryParams: params });
  }

  private verifyQueryParams(): void {
    const queryParams = JSON.parse(JSON.stringify(this.activatedRoute.snapshot.queryParams ?? {}));
    const { page, per_page, order, search, ...filters } = queryParams;
    this.paginator.pageIndex = Number(page ?? 1) - 1;
    this.paginator.pageSize = Number(per_page) ?? 20;
    this.sort.active = order?.split('|')[0] ?? '';
    this.sort.direction = order?.split('|')[1] == 'asc' ? 'asc' : 'desc';
    this.sort.sortChange.emit();
    this.searchCtrl.setValue(search ?? null, { emitEvent: false });
  }

  public callGetData(queryParams:any = JSON.parse(JSON.stringify(this.activatedRoute.snapshot.queryParams ?? {}))): void {
    const params = objectToURLSearchParams(queryParams);
    if(!params.has('page')) params.set('page', String(this.paginator.pageIndex + 1));
    if(!params.has('per_page')) params.set('per_page', String(this.paginator.pageSize));
    if(!params.has('order')) params.set('order', this.defaultOrder);
    this.getData(params);
  }

  private async getData(searchParams: URLSearchParams = new URLSearchParams()): Promise<void> {
    if (this.loading()) {
      this.abortController.abort();
      this.abortController = new AbortController();
    }
    this.loading.set(true);
    const serverUrl = this.configuration.serverUrl;
    let queryParams = this.configuration.queryParams ?? {};
    if (queryParams instanceof Object) {
      queryParams = objectToURLSearchParams(queryParams);
      queryParams = queryParams.toString();
    }
    const url = `${serverUrl}?${searchParams.toString()}&${queryParams ?? ''}`;
    const config = { signal: this.abortController.signal };
    try {
      let items = [];
      let totalItems = 0;
      if (this.dataTypeList == 'array') {
        items = await this.fetch.get<any[]>(url, config);
        totalItems = items.length;
      } else {
        const paginatorData = await this.fetch.get<PaginatorData<any>>(url, config);
        items = this.getKeyItemPipe.transform(paginatorData, this.keyForGetItems);
        totalItems = this.getKeyItemPipe.transform(paginatorData, this.keyForGetTotalItems);
      }
      const { parseDataFn } = this.configuration;
      const parseData = await parseDataFn?.(items) ?? items;
      this.paginator.length = totalItems;
      this.loading.set(false);
      this.data.set(parseData);
    } catch (err: any) {
      if (err.name != FetchErrorType.ABORT) this.loading.set(false);
    }
  }

  public hiddenToggleColumn($event: MatCheckboxChange, index: number): void {
    this.configuration.columns.update((columns) => {
      columns[index]['hidden'] = !$event.checked
      return columns;
    })
    this.generateColumnsCss();
  }

  /* ---------------------------------------------------------------- */
  /* ---------------------------------------------------------------- */
  public navigateCreateView(): void {
    this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
  }

  /* ---------------------------------------------------------------- */
  /* ---------------------------------------------------------------- */
  public allSelectedItems = signal(false);
  public someSelectedItems = signal(false);
  public lengthSelectedItems = computed(() => this.data().filter((e: any) => e.__selected__).length);

  public selectedItem(item: any, status: boolean): void {
    this.data.update((data) => {
      const index = data.findIndex((e) => e.id == item.id);
      data[index].__selected__ = status;
      this.setAllSelectedItems();
      return data;
    });
  }

  public selectedAllItems(status: boolean): void {
    this.data.update((data) => {
      data.forEach((e) => (e.__selected__ = status));
      this.setAllSelectedItems();
      return data;
    });
  }

  public someSelected(): boolean {
    return this.data().length > 0 && this.data().some((e: any) => e.__selected__) && !this.allSelectedItems();
  }

  private setAllSelectedItems(): void {
    this.allSelectedItems.set(this.data().length > 0 && this.data().every((e) => e.__selected__));
    this.someSelectedItems.set(this.someSelected());
  }

  /* ---------------------------------------------------------------- */
  /* ---------------------------------------------------------------- */
  private updateLoadingStatusItem(index: number, status: boolean): void {
    this.data.update((data) => data.map((item, i) => {
      if (i == index) item['__loading_status__'] = status;
      return item;
    }));
  }

  public async deleteItem(item: any, index: number): Promise<void> {
    this.updateLoadingStatusItem(index, true);
    const id = this.configuration.menuItem?.deleteKey ? item[this.configuration.menuItem.deleteKey] : item.id;
    const url = `${this.configuration.serverUrl}/${id}`;
    try {
      await this.fetch.delete(url);
      this.callGetData();
    } catch (error) { }
    this.updateLoadingStatusItem(index, false);
  }

  public async restoreItem(item: any, index: number): Promise<void> {
    this.updateLoadingStatusItem(index, true);
    const id = this.configuration.menuItem?.deleteKey ? item[this.configuration.menuItem.deleteKey] : item.id;
    const url = `${this.configuration.serverUrl}/${id}/restore`;
    const config = { afterAlert: { description: 'Restaurando ítem de la lista' } }
    try {
      await this.fetch.put(url, config);
      this.callGetData();
    } catch (error) { }
    this.updateLoadingStatusItem(index, false);
  }

  /* ---------------------------------------------------------------- */
  /* ---------------------------------------------------------------- */
  private generateFormControlsFromFilterInputs(): void {
    if (this.configuration.filters == false) return;
    if (!this.configuration.filters?.length) this.configuration.filters = defaultListFilterInputs();
    const formFilters = new FormGroup({});
    this.configuration.filters?.forEach((filter) => {
      if (filter.text) {
        formFilters.setControl(filter.text.formControlName, new FormControl(filter.text.defaultValue));
      } else if (filter.textarea) {
        formFilters.setControl(filter.textarea.formControlName, new FormControl(filter.textarea.defaultValue));
      } else if (filter.select) {
        formFilters.setControl(filter.select.formControlName, new FormControl(filter.select.defaultValue));
      } else if (filter.number) {
        formFilters.setControl(filter.number.formControlName, new FormControl(filter.number.defaultValue));
      } else if (filter.date) {
        formFilters.setControl(filter.date.formControlName, new FormControl(filter.date.defaultValue));
      } else if (filter.dateRange) {
        formFilters.setControl(filter.dateRange.formControlNameFrom, new FormControl(filter.dateRange.defaultValueFrom));
        formFilters.setControl(filter.dateRange.formControlNameTo, new FormControl(filter.dateRange.defaultValueTo));
      } else if (filter.autocompleteLocal) {
        formFilters.setControl(filter.autocompleteLocal.formControlName, new FormControl(filter.autocompleteLocal.defaultValue));
      } else if (filter.autocompleteServer) {
        formFilters.setControl(filter.autocompleteServer.formControlName, new FormControl(filter.autocompleteServer.defaultValue));
      } else if (filter.checkbox) {
        formFilters.setControl(filter.checkbox.formControlName, new FormControl(filter.checkbox.defaultValue));
      } else if (filter.switch) {
        formFilters.setControl(filter.switch.formControlName, new FormControl(filter.switch.defaultValue));
      }
    });
    this.formFilters = formFilters;
  }

  public getControlFormFilter(name: string): FormControl {
    return this.formFilters!.get(name) as FormControl;
  }

}
