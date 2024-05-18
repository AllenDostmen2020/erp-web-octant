import { CommonModule, DecimalPipe, Location, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, Input, ContentChild, TemplateRef, ElementRef, Renderer2, signal, WritableSignal, computed, inject, Inject, Optional, InjectionToken, EventEmitter, RendererStyleFlags2, effect, Injector } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FetchService } from '@service/fetch.service';
import { objectToURLSearchParams } from 'src/app/shared/utilities/queryParams';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { IndexListPipe } from '@pipe/index-list.pipe';
import { SpinnerDefaultComponent } from '@component/spinner-default/spinner-default.component';
import { GetKeyItemPipe } from '@pipe/get-key-item.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiffDatePipe } from '@pipe/diff-date.pipe';
import { PaginatorData } from '@interface/paginator';
import { EventsService } from '@service/events.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HiddenOptionButtonRowPipe } from '@pipe/hidden-option-button-row.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GetUserByIdPipe } from '@pipe/get-user-by-id.pipe';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { ListFormatPipe } from '@pipe/list-format.pipe';
import { LoadImagePrivateDirective } from '@directive/load-image-private.directive';
import { FirstLetterUppercasePipe } from '@pipe/first-letter-uppercase.pipe';
import { NavigateLateralPanelOutletDirective } from '@directive/navigate-lateral-panel-outlet.directive';
import { FetchErrorType } from '@interface/fetch';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { InputAutocompleteTemplateComponent } from '@component/input-autocomplete-template/input-autocomplete-template.component';
import { InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { EventGlobalSearch, NAME_EVENT_GLOBAL_SEARCH } from 'src/app/sidenav/sidenav/sidenav.component';
import { ExecuteFunctionListPipe } from './execute-function-list.pipe';
import { FormInput, dateRangeFormInput, selectFormInput, switchFormInput } from '@component/item-form-template/item-form-template.component';
import { RenameTitleColumnListPipe } from './rename-title-column-list.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { NameModuleDatabase } from '@service/database-storage.service';
import { LocalItemPipe } from '@pipe/local-item.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { StatusModel } from '@interface/baseModel';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogData, ConfirmDialogTemplateComponent } from '@component/confirm-dialog-template/confirm-dialog-template.component';

@Component({
  selector: 'app-item-list-template',
  standalone: true,
  templateUrl: './item-list-template.component.html',
  styleUrl: './item-list-template.component.css',
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
    InputAutocompleteTemplateComponent,
    InputSelectTemplateComponent,
    ExecuteFunctionListPipe,
    MatBadgeModule,
    RenameTitleColumnListPipe,
    DecimalPipe,
    LocalItemPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FirstLetterUppercasePipe,
    GetKeyItemPipe,
    RenameTitleColumnListPipe,
    BrowserAnimationsModule,
    DateFnsAdapter,
  ],
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
  public sanitizer = inject(DomSanitizer);
  public dialog = inject(MatDialog);

  // private datePipe = inject(DatePipe);
  public firstLetterUppercasePipe = inject(FirstLetterUppercasePipe);
  public getKeyItemPipe = inject(GetKeyItemPipe);
  public renameTitleColumnListPipe = inject(RenameTitleColumnListPipe);

  public lengthData = computed(() => this.data().length)


  public lengthSelectedFilters = signal(0);

  public loading = signal(true);
  public font: WritableSignal<'small' | 'medium' | 'large'> = signal('medium');
  public headerListStyle: WritableSignal<'simple' | 'color'> = signal('simple');

  private abortController = new AbortController();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    @Optional() @Inject(DATA_TYPE_LIST) _dataTypeList: 'array' | 'paginator',
    @Optional() @Inject(KEY_GET_ITEMS_PAGINATOR_LIST) _keyForGetItems: string,
    @Optional() @Inject(KEY_GET_TOTAL_ITEMS_PAGINATOR_LIST) _keyForGetTotalItems: string,
    // private injector: Injector,
  ) {
    this._dataTypeList = _dataTypeList ?? 'paginator';
    this._keyForGetItems = _keyForGetItems || 'data';
    this._keyForGetTotalItems = _keyForGetTotalItems || 'total';
  }

  private initializeSignalFilters(): void {
    if (this.configuration.filter != false) {
      if (!this.configuration.filter?.inputs) {
        this.configuration.filter = {
          form: null,
          inputs: signal(defaultListFilterInputs())
        };
      } else {
        this.configuration.filter!.form = null
      }
      const filters: WritableSignal<FormInput[]> = this.configuration.filter!.inputs;
      this.generateFormControlsFromFilterInputs(filters());
    }
  }

  get data(): WritableSignal<any[]> {
    return this.configuration.data!;
  }

  get defaultOrder(): string {
    return this.configuration.defaultOrder ? `${this.configuration.defaultOrder?.key}|${this.configuration.defaultOrder?.order}` : 'id|DESC';
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

  get searchCtrl(): FormControl {
    return (this.configuration.filter as any)!.form.get('search') as FormControl;
  }

  ngOnInit(): void {
    this.initializeSignalFilters();
    this.configuration.data = signal([]);
    this.configuration.updateListEvent = new EventEmitter();
    if (this.configuration.rows?.options != false && !this.configuration.rows?.options?.length) {
      this.configuration.rows = {
        ...(this.configuration.rows ?? {}),
        options: [
          viewItemActionButton(),
          editItemActionButton(),
          deleteItemActionButton(),
          restoreItemActionButton(),
        ]
      };
    }
    this.generateColumnsCss();
  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 20;

    this.verifyQueryParams();

    this.sort.sortChange.subscribe(({ active, direction }) => {
      const queryParams = this.getQueryParams();
      if (this.defaultOrder == `${active}|${direction}` || !active || !direction) queryParams['order'] = null;
      else queryParams['order'] = `${active}|${direction}`;
      this.callGetData(queryParams)
    });

    // this.searchCtrl.valueChanges.pipe(debounceTime(250)).subscribe((value: string) => {
    //   const queryParams = this.getQueryParams();
    //   if (value) queryParams['search'] = value;
    //   else queryParams['search'] = null;
    //   this.callGetData(queryParams)
    // });

    this.paginator.page.subscribe(({ pageIndex, pageSize }) => {
      const queryParams = this.getQueryParams();
      if (pageIndex == 0 || (queryParams['page'] ?? null) == pageIndex + 1) queryParams['page'] = null;
      else queryParams['page'] = pageIndex + 1;
      if (pageSize == 20 || (queryParams['per_page'] ?? null) == pageSize) queryParams['per_page'] = null;
      else queryParams['per_page'] = pageSize;
      this.callGetData(queryParams)
    });

    this.eventsService
      .eventsFiltered<EventGlobalSearch>([NAME_EVENT_GLOBAL_SEARCH])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ data }: any) => {
        const type = data.type;
        if (type == 'enter') {
          this.searchCtrl.setValue(data.value, { emitEvent: false });
          this.callGetData(this.getQueryParams());
        } else {
          if (data.value == '' && this.searchCtrl.value) {
            this.searchCtrl.setValue('', { emitEvent: false });
            this.callGetData(this.getQueryParams());
          }
        }
      });

    // this.eventsService
    //   .eventsFiltered([
    //     `${this.configuration.server.url}_created`,
    //     `${this.configuration.server.url}_updated`
    //   ])
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(() => this.callGetData(this.getQueryParams()));

    this.configuration.updateListEvent?.subscribe(() => this.callGetData(this.getQueryParams()));

    this.callGetData(this.getQueryParams());
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
    const grid_areas: string[] = []
    // if (this.configuration.rows?.selectable) {
    //   grid_cols.push('auto');
    //   grid_areas.push('selected');
    // }
    if (this.configuration.rows?.index != false) {
      grid_cols.push('auto');
      grid_areas.push('index');
    }
    for await (const column of this.configuration.columns()) {
      if (!column.hidden) {
        grid_cols.push(column.gridColumn ?? 'auto');
        grid_areas.push(this.renameTitleColumnListPipe.transform(column.title));
      }
    }
    if (this.configuration.rows?.actions) {
      grid_cols.push('auto');
      grid_areas.push('actions');
    }
    if (this.configuration.rows?.options != false) {
      grid_cols.push('auto');
      grid_areas.push('options');
    }
    this.renderer.setStyle(this.divList.nativeElement, 'grid-template-columns', grid_cols.join(' '));
    grid_areas.forEach((area, index) => this.renderer.setStyle(this.divList.nativeElement, `--items-list-grid-area-${index + 1}`, area, RendererStyleFlags2.DashCase));
  }

  /* ---------------------------------------------------------------- */
  /* ---------------------------------------------------------------- */
  public getQueryParams(): { [key: string]: any } {
    let formFilters: any = {};
    if (this.configuration.filter !== false) formFilters = this.configuration.filter!.form?.value ?? {};
    let index = 0;
    for (const key in formFilters) if (formFilters[key]) index++;
    this.lengthSelectedFilters.set(index)
    return {
      ...formFilters,
      page: this.paginator.pageIndex + 1,
      per_page: this.paginator.pageSize,
      order: this.sort.active ? `${this.sort.active}|${this.sort.direction}` : null,
      search: this.searchCtrl.value ? this.searchCtrl.value : null,
    }
  }

  private verifyQueryParams(): void {
    const queryParams = {} as any;
    const { page, per_page, order, search, ...filters } = queryParams;
    this.paginator.pageIndex = Number(page ?? 1) - 1;
    this.paginator.pageSize = Number(per_page) ?? 20;
    this.sort.active = order?.split('|')[0] ?? '';
    this.sort.direction = order?.split('|')[1] == 'asc' ? 'asc' : 'desc';
    this.sort.sortChange.emit();
    this.searchCtrl.setValue(search ?? null, { emitEvent: false });
  }

  public callGetData(queryParams: any): void {
    const params = objectToURLSearchParams(queryParams);
    if (!params.has('page')) params.set('page', String(this.paginator.pageIndex + 1));
    if (!params.has('per_page')) params.set('per_page', String(this.paginator.pageSize));
    if (!params.has('order')) params.set('order', this.defaultOrder);
    this.getData(params);
  }

  private async getData(searchParams: URLSearchParams = new URLSearchParams()): Promise<void> {
    if (this.loading()) {
      this.abortController.abort();
      this.abortController = new AbortController();
    }
    this.loading.set(true);
    const serverUrl = this.configuration.server.url;
    let queryParams: any = this.configuration.server.queryParams ?? {};
    queryParams = objectToURLSearchParams(queryParams);
    queryParams = queryParams.toString();

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
      this.data.set(parseData);
      this.loading.set(false);
      this.checkSelectedItems();
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
  public selectedItems = computed(() => this.data().filter((e: ListItemExtended) => e.__selected__));
  public lengthSelectedItems = computed(() => this.data().filter((e: ListItemExtended) => e.__selected__).length);

  public selectedItem(index: number, status: boolean): void {
    this.data.update((data) => data.toSpliced(index, 1, { ...data[index], __selected__: status }));
    this.checkSelectedItems();
  }

  public selectedAllItems(status: boolean): void {
    this.data.update((data) => data.map((e) => ({ ...e, __selected__: status })));
    this.checkSelectedItems();
  }

  public someSelected(): boolean {
    return this.data().length > 0 && this.data().some((e: ListItemExtended) => e.__selected__) && !this.allSelectedItems();
  }

  private checkSelectedItems(): void {
    this.allSelectedItems.set(this.data().length > 0 && this.data().every((e: ListItemExtended) => e.__selected__));
    this.someSelectedItems.set(this.someSelected());
  }

  /* ---------------------------------------------------------------- */
  /* ---------------------------------------------------------------- */
  private generateFormControlsFromFilterInputs(filters: FormInput[]): void {
    const formFilters = new FormGroup({});
    for (const filter of filters) {
      if (filter.text) {
        if (formFilters.get(filter.text.formControlName)) continue;
        formFilters.setControl(filter.text.formControlName, new FormControl(filter.text.defaultValue));
      } else if (filter.textarea) {
        if (formFilters.get(filter.textarea.formControlName)) continue;
        formFilters.setControl(filter.textarea.formControlName, new FormControl(filter.textarea.defaultValue));
      } else if (filter.select) {
        if (formFilters.get(filter.select.formControlName)) continue;
        formFilters.setControl(filter.select.formControlName, new FormControl(filter.select.defaultValue));
      } else if (filter.number) {
        if (formFilters.get(filter.number.formControlName)) continue;
        formFilters.setControl(filter.number.formControlName, new FormControl(filter.number.defaultValue));
      } else if (filter.date) {
        if (formFilters.get(filter.date.formControlName)) continue;
        formFilters.setControl(filter.date.formControlName, new FormControl(filter.date.defaultValue));
      } else if (filter.dateRange) {
        if (formFilters.get(filter.dateRange.formControlNameFrom)) continue;
        formFilters.setControl(filter.dateRange.formControlNameFrom, new FormControl(filter.dateRange.defaultValueFrom));
        formFilters.setControl(filter.dateRange.formControlNameTo, new FormControl(filter.dateRange.defaultValueTo));
      } else if (filter.autocompleteLocal) {
        if (formFilters.get(filter.autocompleteLocal.formControlName)) continue;
        formFilters.setControl(filter.autocompleteLocal.formControlName, new FormControl(filter.autocompleteLocal.defaultValue));
      } else if (filter.autocompleteServer) {
        if (formFilters.get(filter.autocompleteServer.formControlName)) continue;
        formFilters.setControl(filter.autocompleteServer.formControlName, new FormControl(filter.autocompleteServer.defaultValue));
      } else if (filter.checkbox) {
        if (formFilters.get(filter.checkbox.formControlName)) continue;
        formFilters.setControl(filter.checkbox.formControlName, new FormControl(filter.checkbox.defaultValue));
      } else if (filter.switch) {
        if (formFilters.get(filter.switch.formControlName)) continue;
        formFilters.setControl(filter.switch.formControlName, new FormControl(filter.switch.defaultValue));
      }
    }
    if (!formFilters.get('search')) formFilters.setControl('search', new FormControl());
    (this.configuration.filter as any).form = formFilters;
  }

  public getControlFormFilter(name: string): FormControl {
    return (this.configuration.filter as any).form!.get(name) as FormControl;
  }

  public applyFilters(filterMenu: MatMenu) {
    this.callGetData(this.getQueryParams());
    filterMenu.closed.emit();
  }

  public clearFilters() {
    (this.configuration.filter as any).form?.reset({ emitEvent: false });
  }

  /* ---------------------------------------------------------------- */
  /* ---------------------------------------------------------------- */
  @ViewChild('commentTemplate', { static: true }) commentTemplate!: TemplateRef<any>;
  public commentCtrl = new FormControl('');
  private confirmDialog(data: ConfirmDialogData, TemplateRef?: any): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDialogTemplateComponent, {
        data: <ConfirmDialogData>{
          templateRef: TemplateRef ? TemplateRef : undefined,
          ...data,
        }
      });
      dialogRef.afterClosed().subscribe((result) => resolve(result));
    });
  }

  private async confirmDialogWithComment(data: ConfirmDialogData, required?: boolean): Promise<null | { comment: string }> {
    this.commentCtrl.setValue('');
    this.commentCtrl.clearValidators();
    let subscribe:Subscription|null = null;
    if(required) {
      this.commentCtrl.setValidators([Validators.required]);
      data.confirmButton = {
        ...data.confirmButton ?? {},
        disabled: true,
      }
      subscribe = this.commentCtrl.valueChanges.subscribe(() => {
        data.confirmButton!.disabled = !(this.commentCtrl.valid);
      })
    }
    const confirm = await this.confirmDialog(data, this.commentTemplate);
    if(subscribe) subscribe.unsubscribe();
    if(!confirm) return null;
    return {
      comment: this.commentCtrl.value as string,
    };
  }

  private updateLoadingStatusItem(index: number, status: boolean): void {
    this.data.update((data) => data.map((item: ListItemExtended, i) => {
      if (i == index) item.__loading_status__ = status;
      return item;
    }));
  }

  public deleteItem = async (id: number | string) => {
    const index = this.data().findIndex((e) => e.id == id);
    if (index == -1) return;
    this.updateLoadingStatusItem(index, true);
    const url = `${this.configuration.server.url}/${id}`;
    try {
      await this.fetch.delete(url);
      this.callGetData(this.getQueryParams())
    } catch (error) { }
    this.updateLoadingStatusItem(index, false);
  }

  public restoreItem = async (id: string | number) => {
    const index = this.data().findIndex((e) => e.id == id);
    if (index == -1) return;
    this.updateLoadingStatusItem(index, true);
    const url = `${this.configuration.server.url}/${id}/restore`;
    try {
      await this.fetch.put(url, {});
      this.callGetData(this.getQueryParams());
    } catch (error) { }
    this.updateLoadingStatusItem(index, false);
  }

  public changeStatusItem = async (id: string | number, status: any, withComment?: boolean, requireComment?: boolean) => {
    const index = this.data().findIndex((e) => e.id == id);
    if (index == -1) return;
    this.updateLoadingStatusItem(index, true);
    const item:any = this.data()[index];
    const url = `${this.configuration.server.url}/${id}/change-status`;
    const dialogData: ConfirmDialogData = {
      icon: 'info',
      title: '¿Está seguro de cambiar estado?',
      description: `El registro seleccionado pasará del estado <b>${item.status.toUpperCase()}</b> a <b>${status.toUpperCase()}</b>, tenga en cuenta que el cambio de estado puede afectar a otros registros`
    };
    let data:any = { comment: '' };
    if(withComment) {
      data = await this.confirmDialogWithComment(dialogData, requireComment??false);
      if(!data) return;
    } else {
      const confirm = await this.confirmDialog(dialogData);
      if(!confirm) return;
    }
    try {
      const response = await this.fetch.put<any>(url, { 
        status,
        status_update_comment: data.comment,
      });
      this.updateChangesItem(index, {
        ...item,
        ...response,
        __loading_status__: false,
      });
    } catch (error) {
      this.updateLoadingStatusItem(index, false);
    }
  }

  public updateChangesItem = (index: number, item: any) => {
    this.configuration.data!.update(items => items.toSpliced(index, 1, item));
  }

}

export const DATA_TYPE_LIST = new InjectionToken<'array' | 'paginator'>('KEY_GET_ITEMS_PAGINATOR_LIST');
export const KEY_GET_ITEMS_PAGINATOR_LIST = new InjectionToken('KEY_GET_ITEMS_PAGINATOR_LIST');
export const KEY_GET_TOTAL_ITEMS_PAGINATOR_LIST = new InjectionToken('KEY_GET_TOTAL_ITEMS_PAGINATOR_LIST');
export interface ItemListConfiguration<T = any> {
  readonly dataType?: 'array' | 'paginator';
  readonly keyGetItemsPaginator?: string;
  readonly keyGetTotalItemsPaginator?: string;

  readonly disableFiltersInQueryParams?: boolean;

  title: string | null;

  parseDataFn?: (data: T[]) => T[] | Promise<T[]>;
  data?: WritableSignal<T[]>;
  updateListEvent?: EventEmitter<void>;

  defaultOrder?: {
    key: string,
    order: 'ASC' | 'DESC'
  };

  backButton?: boolean;

  updateButton?: boolean;

  server: {
    readonly url: string,
    queryParams?: { [key: string]: any };
  }

  createButton?: {
    text?: string,
    routerLink: RouterLinkCreateButton
  } | false;

  // formFilters?: FormGroup<any> | null;
  // filters?: WritableSignal<FormInput[]> | false;

  filter?: {
    search?: boolean;
    form?: FormGroup<any> | null;
    inputs: WritableSignal<FormInput[]>;
  } | false

  rows?: {
    selectable?: {
      actions: SelectableActionButton<T>[];
    };
    index?: false | ({ title: string });
    cssClass?: string | ((item: T) => string);
    actions?: ActionButton<T>[];
    options?: ActionButton<T>[] | false;
  },

  columns: WritableSignal<ListColumn<T>[]>;
}
export interface RouterLinkCreateButton {
  url: string;
  outlet?: 'route-lateral' | 'principal';
  queryParams?: { [key: string]: any },
  state?: any;
}
export interface RouterLinkItem<T> {
  url: ((item: T, index: number) => string) | string;
  outlet?: 'route-lateral' | 'principal';
  queryParams?: { [key: string]: any },
  state?: ((item: T, index: number) => (string | { [key: string]: any } | any[] | number | null)) | string | { [key: string]: any } | any[] | number | null;
}

export type StyleButton = 'filled-button' | 'tonal-button' | 'text-button' | 'outlined-button' | 'elevated-button' | 'icon-button' | 'tonal-icon-button' | 'filled-icon-button' | 'outlined-icon-button';

interface ActionButton<T> {
  type: 'clickEvent' | 'routerLink';
  icon?: string | ((item: T, index: number) => string);
  text?: string | ((item: T, index: number) => string);
  title?: string;
  style?: StyleButton;
  hidden?: boolean | ((item: T, index: number) => boolean);
  disabled?: boolean | ((item: T, index: number) => boolean);
  cssClass?: string | ((item: T, index: number) => string);
  cssStyle?: ({ [key: string]: any }) | ((item: T, index: number) => ({ [key: string]: any }));
  fn?: (item: T, index: number, fns: {
    deleteItemFn: (id: number | string) => Promise<void>,
    restoreItemFn: (id: number | string) => Promise<void>,
    changeStatusItemFn: (id: number | string, status: any, withComment?:boolean, requireComment?:boolean) => Promise<void>,
    updateChangesItemFn: (id: number, item: T) => void,
  }) => void;
  routerLink?: RouterLinkItem<T>;
}
interface ClickEventActionButton<T> extends Omit<Required<Pick<ActionButton<T>, 'fn'>> & ActionButton<T>, 'type' | 'routerLink'> { }
export const clickEventActionButton = <T = any>(config: ClickEventActionButton<T>): ActionButton<T> => ({ type: 'clickEvent', ...config });
interface RouterLinkActionButton<T> extends Omit<Required<Pick<ActionButton<T>, 'routerLink'>> & ActionButton<T>, 'type' | 'clickEvent'> { }
export const routerLinkActionButton = <T = any>(config: RouterLinkActionButton<T>): ActionButton<T> => ({ type: 'routerLink', ...config });
interface SelectableActionButton<T> {
  icon?: string;
  text?: string;
  title?: string;
  style?: StyleButton;
  hidden?: boolean | ((selectedItems: T[]) => boolean);
  disabled?: boolean | ((selectedItems: T[]) => boolean);
  cssClass?: string | ((selectedItems: T[]) => string);
  cssStyle?: ({ [key: string]: any }) | ((selectedItems: T[]) => ({ [key: string]: any }));
  fn: (selectedItems: T[]) => void;
}
export const selectableActionButton = <T = any>(config: SelectableActionButton<T>): SelectableActionButton<T> => ({ ...config });

export interface ListItemExtended {
  __selected__?: boolean;
  __loading_status__?: boolean;
}

export type TypeValueKeyItem = 'text' | 'diff-date' | 'date' | 'number' | 'email' | 'phone' | 'user' | 'uppercase' | 'lowercase' | 'titlecase' | 'first-letter-uppercase' | 'list-format' | 'currency' | 'local-item';

export interface ListColumn<T> {
  /**
   * @description
   * Agrega clases css al contenedor de la celda de la columna
   * @example
   * ...
   * cssClass: (item) => item.status === 'active' ? 'text-green-500' : 'text-red-500'
   */
  align?: 'left' | 'center' | 'right';

  /**
   * @description
   * Función que se ejecuta al dar click en el valor adicional de la celda de la columna
   * @example
   * clickEventAdditionalValue: (item) => { // TODO }
   * @param item como parámetro pasa el item de cada elemento de la lista
   * @returns void
   */
  clickEventAdditionalValue?: (item: T, index: number) => void;

  /**
   * @description
   * Función que se ejecuta al dar click en el valor de la celda de la columna
   * @example
   * clickEventValue: (item) => { // TODO }
   * @param item como parámetro pasa el item de cada elemento de la lista
   * @returns void
   */
  clickEventValue?: (item: T, index: number, event?: any) => void;

  /**
   * @description
   * Agrega clases css a la celda de la columna
   * @example
   * ...
   * cssClass: (item) => item.status === 'active' ? 'text-green-500' : 'text-red-500'
   * ...
   * cssClass: 'text-green-500'
   * ...
   */
  cssClass?: ((item: T) => string) | string;

  /**
   * @description
   * Agrega clases css al elemento del valor adicional de la celda de la columna
   * @example
   * ...
   * cssClassDisplayAdditionalValue: (item) => item.status === 'active' ? 'text-green-500' : 'text-red-500'
   * ...
   * cssClassDisplayAdditionalValue: 'text-green-500'
   * ...
   */
  cssClassDisplayAdditionalValue?: ((item: T) => string) | string;

  /**
   * @description
   * Agrega clases css al elemento del valor de la celda de la columna
   * @example
   * ...
   * cssClassDisplayValue: (item) => item.status === 'active' ? 'text-green-500' : 'text-red-500'
   * ...
   * cssClassDisplayValue: 'text-green-500'
   * ...
   */
  cssClassDisplayValue?: ((item: T) => string) | string;

  /**
   * @description
   * Establece el formato de la columna cuando esta es de tipo fecha (type: 'date')
   * @example
   * ...
   * dateFormat: 'yyyy-MM-dd'
   * ...
   * dateFormat: 'dd/MM/yyyy' // Por defecto
   * ...
   */
  dateFormat?: string;

  /**
   * @description
   * Función que retorna el valor adicional a mostrar en la celda de cada columna
   * @example
   * ...
   * displayAdditionalValueFn: (item) => item.name
   * ...
   * displayAdditionalValueFn: (item) => item.price // with type 'number'
   * ...
   * displayAdditionalValueFn: (item) =>  `<p>${item.name} <i>${item.email}</i></p>`// with type 'html'
   * ...
   * displayAdditionalValueFn: (item) => item.contacts.map((contact) => contact.name) // with type 'list-format'
   * ...
   * @param item
   * @returns Date | string | number | null | undefined | string[] | number[]
   */
  displayAdditionalValueFn?: (item: T, index: number) => Date | string | number | null | undefined | string[] | number[];

  /**
   * @description
   * Función que retorna el valor a mostrar en la celda de cada columna
   * @example
   * ...
   * displayValueFn: (item) => item.name
   * ...
   * displayValueFn: (item) => item.price // with type 'number'
   * ...
   * displayValueFn: (item) =>  `<p>${item.name} <i>${item.email}</i></p>`// with type 'html'
   * ...
   * displayValueFn: (item) => item.contacts.map((contact) => contact.name) // with type 'list-format'
   * ...
   * @param item
   * @returns Date | string | number | null | undefined | string[] | number[]
   */
  displayValueFn: (item: T, index: number) => Date | string | number | null | undefined | string[] | number[];

  /**
   * @description
   * If you want to display a value in the column that is not in the item, you can use this function
   * @example
   * ...
   * gridColumn: '1fr'
   * ...
   * gridColumn: '200px'
   * ...
   * gridColumn: 'max-content'
   * ...
   * gridColumn: 'fit-content(200px)'
   * ...
   */
  gridColumn?: string;

  /**
   * @description
   * Establece que la columna esté oculta para la lista, se puede mostrar con el icono de configuraciones > Columnas
   * @example
   * ...
   * hidden: true
   * ...
   * hidden: false // Por defecto
   * ...
   */
  hidden?: boolean;

  /**
   * @description
   * Establece el formato de la columna cuando esta es de tipo número (type: 'number')
   * @example
   * ...
   * numberFormat: '2.2-2'
   * ...
   * numberFormat: '0.2-2' // Por defecto
   * ...
   */
  numberFormat?: string;

  /**
   * @description
   * Para agregarle routerLink al valor adicional de la columna
   * @example
   * ...
   * routerLinkAdditionalValue: {
   *     url: (item) => `/admin/usuarios/${item.id}`,
   * }
   * ...
   * routerLinkAdditionalValue: {
   *    outlet: 'route-lateral',
   *    url: '/admin/usuarios',
   * }
   * ...
   */
  routerLinkAdditionalValue?: RouterLinkItem<T>;

  /**
   * @description
   * Para agregarle routerLink al valor de la columna
   * @example
   * ...
   * routerLinkValue: {
   *     url: (item) => `/admin/usuarios/${item.id}`,
   * }
   * ...
   * routerLinkValue: {
   *    outlet: 'route-lateral',
   *    url: '/admin/usuarios',
   * }
   * ...
   */
  routerLinkValue?: RouterLinkItem<T>;

  /**
   * @description
   * Sortable column espicif key in object configuration
   * @example
   * sort: { key: 'name' }
   */
  sort?: { key: string };

  /**
   * @description
   * Set Inline style for display additional value
   * @example
   * ...
   * cssStyleDisplayAdditionalValue: (item) => ({ color: item.status === 'active' ? 'green' : 'red' })
   * ...
   * cssStyleDisplayAdditionalValue: { color: 'green' }
   * ...
   * @param item
   * @returns string | number | null | undefined | string[] | number[]
   */
  cssStyleDisplayAdditionalValue?: ((item: T, index: number) => ({ [key: string]: any })) | ({ [key: string]: any });

  /**
   * @description
   * Set Inline style for display value
   * @example
   * ...
   * cssStyleDisplayValue: (item) => ({ color: item.status === 'active' ? 'green' : 'red' })
   * ...
   * cssStyleDisplayValue: { color: 'green' }
   * ...
   */
  cssStyleDisplayValue?: ((item: T, index: number) => ({ [key: string]: any })) | ({ [key: string]: any });

  /**
   * @description
   * Title column
   * @example
   * title: 'Nombre'
   */
  title: string;

  /**
   * @description
   * To display a tooltip in the column on hover
   * @example
   * tooltip: 'Ver detalle'
   */
  tooltip?: ((item: T) => string) | string;

  /**
   * @description
   * For show type value in cell
   * @example
   * ...
   * type: 'number',
   * displayValueFn: (item) => item.price, // output: 2,000.00
   * ...
   * type: 'date',
   * displayValueFn: (item) => item.created_at, // output 12/12/2020
   * ...
   */
  type?: TypeValueKeyItem | 'image' | 'html';

  image?: {
    prefixUrl?: string;
    width?: number;
    height?: number;
    alt?: string;
  }

  localItem?: {
    displayTextValue: <D = any>(item: D) => string | null;
    nameModuleDatabase: NameModuleDatabase,
  }

  /**
   * @description for set principal value for example if is name of client list, it is important for responsive
   * @example principal: true
   * @default false
   */
  principal?: boolean;

  /**
   * @description it is important for responsive
   * @example icon: 'person'
   * @default null
   */
  icon?: string;

  /**
   * @description for set hidden in mobile
   * @example hiddenInMobile: true
   * @default false
   */
  hiddenInMobile?: boolean;
}

interface SimpleListColumn<T> extends Omit<ListColumn<T>, 'type' | 'displayAdditionalValueFn' | 'displayValueFn' | 'dateFormat' | 'numberFormat' | 'image' | 'localItem'> { }
interface SimpleListColumn2<T> extends Omit<SimpleListColumn<T>, 'cssStyleDisplayAdditionalValue' | 'routerLinkAdditionalValue' | 'cssClassDisplayAdditionalValue' | 'clickEventAdditionalValue'> { }
interface ListFormatListColumn<T = any> extends SimpleListColumn<T> {
  displayAdditionalValueFn?: (item: T, index: number) => string[];
  displayValueFn: (item: T, index: number) => string[];
}

interface NumberListColumn<T = any> extends SimpleListColumn<T> {
  displayAdditionalValueFn?: (item: T, index: number) => number | null | undefined;
  displayValueFn: (item: T, index: number) => number | null | undefined;
  numberFormat?: string;
}

interface StringListColumn<T = any> extends SimpleListColumn<T> {
  displayAdditionalValueFn?: (item: T, index: number) => string | number | null | undefined;
  displayValueFn: (item: T, index: number) => string | number | null | undefined;
}

interface DateListColumn<T = any> extends SimpleListColumn<T> {
  displayAdditionalValueFn?: (item: T, index: number) => string | number | null | undefined;
  displayValueFn: (item: T, index: number) => Date | string | number | null | undefined;
  dateFormat?: string;
}

interface ImageListColumn<T = any> extends SimpleListColumn2<T> {
  displayValueFn: (item: T, index: number) => string | null | undefined;
  image?: {
    prefixUrl?: string;
    width?: number;
    height?: number;
    alt?: string;
  }
}

interface LocalItemColumn<T = any> extends SimpleListColumn2<T> {
  displayValueFn: (item: T, index: number) => number | string | null | undefined;
  localItem: {
    displayTextValue: <X = any>(item: X) => string | null;
    nameModuleDatabase: NameModuleDatabase;
  }
}

interface HtmlListColumn<T = any> extends SimpleListColumn2<T> {
  displayValueFn: (item: T, index: number) => string | null | undefined;
}

export const numberColumn = <T = any>(config: NumberListColumn<T>): ListColumn<T> => ({ type: 'number', ...config });

export const listFormatColumn = <T = any>(config: ListFormatListColumn<T>): ListColumn<T> => ({ type: 'list-format', ...config });

export const dateColumn = <T = any>(config: DateListColumn<T>): ListColumn<T> => ({ type: 'date', ...config });

export const diffDateColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'diff-date', ...config });

export const htmlColumn = <T = any>(config: HtmlListColumn<T>): ListColumn<T> => ({ type: 'html', ...config });

export const textColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'text', ...config });

export const uppercaseColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'uppercase', ...config });

export const lowercaseColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'lowercase', ...config });

export const titlecaseColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'titlecase', ...config });

export const firstLetterUppercaseColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'first-letter-uppercase', ...config });

export const phoneColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'phone', ...config });

export const emailColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'email', ...config });

export const userColumn = <T = any>(config: NumberListColumn<T>): ListColumn<T> => ({ type: 'user', ...config });

export const imageColumn = <T = any>(config: ImageListColumn<T>): ListColumn<T> => ({ type: 'image', ...config });

export const localItemColumn = <T = any>(config: LocalItemColumn<T>): ListColumn<T> => ({ type: 'local-item', ...config });

export const itemNameAndDescriptionColumn = <T = any>(config?: Partial<Omit<StringListColumn<T>, 'type' | 'displayValueFn' | 'displayAdditionalValueFn'>>): ListColumn<T> => ({
  title: 'Nombre',
  gridColumn: '1fr',
  sort: { key: 'name' },
  routerLinkValue: { url: (item: any) => `../detail/${item.id}` },
  displayValueFn: (item: any) => item.name,
  displayAdditionalValueFn: (item: any) => item.description,
  principal: true,
  ...config,
});
export const itemStatusColumn = <T = any>(config?: Partial<Omit<StringListColumn<T>, 'type' | 'title' | 'displayValueFn' | 'cssClassDisplayValue' | 'displayAdditionalValueFn'>>): ListColumn<T> => ({
  type: 'html',
  title: 'Estado',
  sort: { key: 'status' },
  align: 'center',
  displayValueFn: (item: any) => `<span title="${item.status}" class="status-chip">${item.status}</span>`,
  ...config,
});
export const itemCreatedAtColumn = <T = any>(config?: Partial<Omit<StringListColumn<T>, 'type' | 'title' | 'displayValueFn' | 'displayAdditionalValueFn'>>): ListColumn<T> => ({
  type: 'date',
  title: 'Creado',
  sort: { key: 'created_at' },
  displayValueFn: (item: any) => item.created_at,
  ...config,
});
export const itemUpdatedAtColumn = <T = any>(config?: Partial<Omit<StringListColumn<T>, 'type' | 'title' | 'displayValueFn' | 'displayAdditionalValueFn'>>): ListColumn<T> => ({
  type: 'date',
  title: 'Actualizado',
  sort: { key: 'updated_at' },
  hidden: true,
  displayValueFn: (item: any) => item.updated_at,
  ...config,
});
export const simpleListColumns = (): ListColumn<any>[] => ([
  itemNameAndDescriptionColumn(),
  itemUpdatedAtColumn(),
  itemCreatedAtColumn(),
  itemStatusColumn(),
]);

export const statusFilterFormInput = (status: string[] | StatusModel[], defaultValue?: StatusModel): FormInput => selectFormInput({
  formControlName: 'status',
  textLabel: 'Estado',
  defaultValue: defaultValue,
  data: signal(status.map((item) => ({ name: item.toUpperCase(), id: item }))),
});

export const datesFilterFormInput = (): FormInput => dateRangeFormInput({
  textLabel: 'Fechas',
  formControlNameFrom: 'updated_at_from',
  formControlNameTo: 'updated_at_to',
})

export const defaultListFilterInputs = (): FormInput[] => [
  dateRangeFormInput({
    textLabel: 'Fechas',
    formControlNameFrom: 'updated_at_from',
    formControlNameTo: 'updated_at_to',
  }),
  // switchFormInput({
  //   textLabel: 'Incluir registros inactivos',
  //   formControlName: 'inactive',
  // }),
  // switchFormInput({
  //   textLabel: 'Solo registros inactivos',
  //   formControlName: 'only_inactive',
  // }),
];

export const deleteItemActionButton = () => clickEventActionButton({
  icon: 'delete',
  text: 'Eliminar',
  fn: async ({ id }, _, { deleteItemFn }) => deleteItemFn(id),
  hidden: (item) => item.deleted_at,
});

export const restoreItemActionButton = () => clickEventActionButton({
  icon: 'restore',
  text: 'Restaurar',
  fn: async ({ id }, _, { restoreItemFn }) => restoreItemFn(id),
  hidden: (item) => !item.deleted_at,
})

export const changeStatusItemActionButton = <T = any>(
  options: {
    icon: string | ((item: T, index: number) => string);
    text: string | ((item: T, index: number) => string);
    hidden?: boolean | ((item: T, index: number) => boolean);
    comment?: {
      required?: boolean;
      textLabelInput?: string;
      textError?: string;
    }
  },
  statusValues: { [key: string]: any }
) => clickEventActionButton({
  icon: options.icon,
  text: options.text,
  hidden: options.hidden ?? ((item: any) => item.deleted_at ? true : false),
  fn: (item: any, index, { changeStatusItemFn }) => {
    const newStatus = statusValues[item.status];
    changeStatusItemFn(item.id, newStatus, options instanceof Object ? true : false, options.comment?.required ?? false);
  }
});

export const viewItemActionButton = () => routerLinkActionButton({
  icon: 'visibility',
  text: 'Ver',
  routerLink: { url: (item) => `../view/${item.id}` },
});

export const editItemActionButton = () => routerLinkActionButton({
  icon: 'edit',
  text: 'Editar',
  routerLink: { url: (item) => `../edit/${item.id}` },
})
