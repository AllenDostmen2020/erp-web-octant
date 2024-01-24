import { CommonModule, DatePipe, Location, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, Input, ContentChild, TemplateRef, ElementRef, Renderer2, ViewEncapsulation, signal, WritableSignal, computed, inject, Inject, Optional, InjectionToken, EventEmitter } from '@angular/core';
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

import { NameModuleDatabase } from "@service/database-storage.service";
import { RouterLinkItem, StyleButton } from '@interface/itemDetail';

export const DATA_TYPE_LIST = new InjectionToken<'array' | 'paginator'>('KEY_GET_ITEMS_PAGINATOR_LIST');
export const KEY_GET_ITEMS_PAGINATOR_LIST = new InjectionToken('KEY_GET_ITEMS_PAGINATOR_LIST');
export const KEY_GET_TOTAL_ITEMS_PAGINATOR_LIST = new InjectionToken('KEY_GET_TOTAL_ITEMS_PAGINATOR_LIST');

export interface ItemListConfiguration<T = any> {
    readonly keyGetItemsPaginator?: string;
    readonly keyGetTotalItemsPaginator?: string;
    readonly dataType?: 'array' | 'paginator';

    title: string | null;
    readonly serverUrl: string;
    queryParams?: { [key: string]: any } | string;
    defaultOrder?: string;
    columns: WritableSignal<ListColumn<T>[]>;
    parseDataFn?: (data: T[]) => T[] | Promise<T[]>;
    updateListEvent?: EventEmitter<boolean>;
    data?: WritableSignal<T[]>
    readonly disableFiltersInQueryParams?: boolean;
    hideUpdateList?: boolean;
    hideFilters?: boolean;
    showBackButton?: boolean;
    selectable?: boolean;
    createButton?: {
        text?: string,
        routerLink: RouterLinkItem<T>
    } | false;

    filters?: FormInput[] | false;

    rows?: {
        index?: false | ({ title: string });
        cssClass?: string | ((item: T) => string);
        actions?: ActionButton<T, ActionButtonActionsType>[] | false;
        options?: ActionButton<T, ActionButtonActionsType>[] | false;
    }
}

export declare type ActionButtonActionsType = 'clickEvent' | 'routerLink';
export interface ActionButton<T, ActionType = 'clickEvent'> {
    type: ActionType;
    icon?: string;
    text?: string;
    title?: string;
    style?: StyleButton;
    hidden?: boolean | ((item: T) => boolean);
    disabled?: boolean | ((item: T) => boolean);
    cssClass?: string | ((item: T) => string);
    cssStyle?: ({ [key: string]: any }) | ((item: T) => ({ [key: string]: any }));
    clickEvent?: (item: T, deleteFn?: (id: number | string) => Promise<void>, restoreFn?: (id: number | string) => Promise<void>) => void;
    routerLink?: RouterLinkItem<T>;
}

export const clickEventActionButton = <T = any>(config: Omit<ActionButton<T>, 'type' | 'routerLink'>): ActionButton<T, ActionButtonActionsType> => ({ type: 'clickEvent', ...config });
export const routerLinkActionButton = <T = any>(config: Omit<ActionButton<T>, 'type' | 'clickEvent'>): ActionButton<T, ActionButtonActionsType> => ({ type: 'routerLink', ...config });
export interface ListItemExtended {
    __selected__?: boolean;
    __loading_status__?: boolean;
}

export type TypeValueKeyItem = 'text' | 'diff-date' | 'date' | 'number' | 'email' | 'phone' | 'user' | 'uppercase' | 'lowercase' | 'titlecase' | 'first-letter-uppercase' | 'list-format' | 'currency';

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
    clickEventAdditionalValue?: (item: T) => void;

    /**
     * @description
     * Función que se ejecuta al dar click en el valor de la celda de la columna
     * @example
     * clickEventValue: (item) => { // TODO }
     * @param item como parámetro pasa el item de cada elemento de la lista
     * @returns void
     */
    clickEventValue?: (item: T) => void;

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
    displayAdditionalValueFn?: (item: T) => Date | string | number | null | undefined | string[] | number[];

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
    displayValueFn: (item: T) => Date | string | number | null | undefined | string[] | number[];

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
    cssStyleDisplayAdditionalValue?: ((item: T) => ({ [key: string]: any })) | ({ [key: string]: any });

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
    cssStyleDisplayValue?: ((item: T) => ({ [key: string]: any })) | ({ [key: string]: any });

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
}

interface ListFormatListColumn<T = any> extends Omit<ListColumn<T>, 'type' | 'displayAdditionalValueFn' | 'displayValueFn'> {
    displayAdditionalValueFn?: (item: T) => string[];
    displayValueFn: (item: T) => string[];
}

interface NumberListColumn<T = any> extends Omit<ListColumn<T>, 'type' | 'displayAdditionalValueFn' | 'displayValueFn'> {
    displayAdditionalValueFn?: (item: T) => number | null | undefined;
    displayValueFn: (item: T) => number | null | undefined;
}

interface StringListColumn<T = any> extends Omit<ListColumn<T>, 'type' | 'displayAdditionalValueFn' | 'displayValueFn'> {
    displayAdditionalValueFn?: (item: T) => string | number | null | undefined;
    displayValueFn: (item: T) => string | number | null | undefined;
}

interface DateListColumn<T = any> extends Omit<ListColumn<T>, 'type' | 'displayAdditionalValueFn' | 'displayValueFn'> {
    displayAdditionalValueFn?: (item: T) => string | number | null | undefined;
    displayValueFn: (item: T) => Date | string | number | null | undefined;
}

export const numberColumn = <T = any>(config: NumberListColumn<T>): ListColumn<T> => ({ type: 'number', ...config });

export const listFormatColumn = <T = any>(config: ListFormatListColumn<T>): ListColumn<T> => ({ type: 'list-format', ...config });

export const dateColumn = <T = any>(config: DateListColumn<T>): ListColumn<T> => ({ type: 'date', ...config });

export const diffDateColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'diff-date', ...config });

export const htmlColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'html', ...config });

export const textColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'text', ...config });

export const uppercaseColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'uppercase', ...config });

export const lowercaseColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'lowercase', ...config });

export const titlecaseColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'titlecase', ...config });

export const firstLetterUppercaseColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'first-letter-uppercase', ...config });

export const phoneColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'phone', ...config });

export const emailColumn = <T = any>(config: StringListColumn<T>): ListColumn<T> => ({ type: 'email', ...config });

export const userColumn = <T = any>(config: NumberListColumn<T>): ListColumn<T> => ({ type: 'user', ...config });


export const itemNameAndDescriptionColumn = <T = any>(config?: Partial<Omit<StringListColumn<T>, 'type' | 'displayValueFn' | 'displayAdditionalValueFn'>>): ListColumn<T> => ({
    title: 'Nombre',
    gridColumn: '1fr',
    sort: { key: 'name' },
    routerLinkValue: { url: (item: any) => `../detail/${item.id}` },
    displayValueFn: (item: any) => item.name,
    displayAdditionalValueFn: (item: any) => item.description,
    ...config,
});
export const itemStatusColumn = <T = any>(config?: Partial<Omit<StringListColumn<T>, 'type' | 'title' | 'displayValueFn' | 'cssClassDisplayValue' | 'displayAdditionalValueFn'>>): ListColumn<T> => ({
    type: 'first-letter-uppercase',
    title: 'Estado',
    sort: { key: 'status' },
    align: 'center',
    displayValueFn: (item: any) => item.status,
    cssClassDisplayValue: (item: any) => `status-chip ${item.status}`,
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
    if(this.configuration.rows?.options != false && !this.configuration.rows?.options?.length)
    this.configuration['rows']!['options'] = [
      routerLinkActionButton({
        icon: 'visibility',
        text: 'Ver',
        routerLink: { url: (item) => `../view/${item.id}` },
      }),
      routerLinkActionButton({
        icon: 'edit',
        text: 'Editar',
        routerLink: { url: (item) => `../edit/${item.id}` },
      }),
      clickEventActionButton({
        icon: 'delete',
        text: 'Eliminar',
        clickEvent: (item) => this.deleteItem(item.id),
        hidden: (item) => item.deleted_at,
      }),
      clickEventActionButton({
        icon: 'restore',
        text: 'Restaurar',
        clickEvent: (item) => this.restoreItem(item.id),
        hidden: (item) => !item.deleted_at,
      })
    ];
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
    if (this.configuration.rows?.index != false) grid_cols.push('auto');
    for await (const column of this.configuration.columns()) {
      if (!column.hidden) grid_cols.push(column.gridColumn ?? 'auto');
    }
    if (this.configuration.rows?.actions != false) grid_cols.push('auto');
    if (this.configuration.rows?.options != false) grid_cols.push('auto');
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
  public lengthSelectedItems = computed(() => this.data().filter((e: ListItemExtended) => e.__selected__).length);

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
    return this.data().length > 0 && this.data().some((e: ListItemExtended) => e.__selected__) && !this.allSelectedItems();
  }

  private setAllSelectedItems(): void {
    this.allSelectedItems.set(this.data().length > 0 && this.data().every((e:ListItemExtended) => e.__selected__));
    this.someSelectedItems.set(this.someSelected());
  }

  /* ---------------------------------------------------------------- */
  /* ---------------------------------------------------------------- */
  private updateLoadingStatusItem(index: number, status: boolean): void {
    this.data.update((data) => data.map((item:ListItemExtended, i) => {
      if (i == index) item.__loading_status__ = status;
      return item;
    }));
  }

  public async deleteItem(id: number | string): Promise<void> {
    const index = this.data().findIndex((e) => e.id == id);
    if(index == -1) return;
    this.updateLoadingStatusItem(index, true);
    const url = `${this.configuration.serverUrl}/${id}`;
    try {
      await this.fetch.delete(url);
      this.callGetData();
    } catch (error) { }
    this.updateLoadingStatusItem(index, false);
  }

  public async restoreItem(id: string | number): Promise<void> {
    const index = this.data().findIndex((e) => e.id == id);
    if(index == -1) return;
    this.updateLoadingStatusItem(index, true);
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
