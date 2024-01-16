import { EventEmitter, InjectionToken, WritableSignal } from "@angular/core";
import { NameModuleDatabase } from "@service/database-storage.service";
import { ActionButton, RouterLinkItem } from "./itemDetail";
import { FormInput } from "./itemForm";

export const DATA_TYPE_LIST = new InjectionToken<'array' | 'paginator'>('KEY_GET_ITEMS_PAGINATOR_LIST');
export const KEY_GET_ITEMS_PAGINATOR_LIST = new InjectionToken('KEY_GET_ITEMS_PAGINATOR_LIST');
export const KEY_GET_TOTAL_ITEMS_PAGINATOR_LIST = new InjectionToken('KEY_GET_TOTAL_ITEMS_PAGINATOR_LIST');

export interface ItemListConfiguration<T = any> {
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
    hideOptionsColumn?: boolean;
    hideIndexColumn?: boolean;
    showBackButton?: boolean;
    selectable?: boolean;
    menuItem?: ItemListMenuItem<T>;
    createButton?: {
        text?: string,
        routerLink: string,
        state?: any,
        outlet?: 'route-lateral' | 'principal';
    } | false;

    actionButtons?: ActionButton<T, ActionButtonType>[];

    filters?: FormInput[] | false;

    readonly keyGetItemsPaginator?: string;
    readonly keyGetTotalItemsPaginator?: string;
    readonly dataType?: 'array' | 'paginator';
}

export interface ListItemExtended {
    __selected__?: boolean;
    __hidden_option_buttons__?: string[];
    __hidden_action_buttons__?: string[];
    __disabled_action_buttons__?: string[];
    __disabled_option_buttons__?: string[];
    __loading_status__?: boolean;
}

export type TypeValueKeyItem = 'text' | 'diff-date' | 'date' | 'number' | 'email' | 'phone' | 'user' | 'uppercase' | 'lowercase' | 'titlecase' | 'first-letter-uppercase' | 'list-format' | 'currency';

export interface ItemListMenuItem<T> {
    hiddenOptionView?: boolean;
    prefixRouterLinkView?: string;
    hiddenOptionEdit?: boolean;
    hiddenOptionDelete?: boolean;
    deleteKey?: string;
    habiliteInhabiliteKey?: string;
    options?: {
        id: string;
        type: 'clickEvent' | 'edit_item' | 'delete_item' | 'view_item' | 'restore_item';
        text?: string;
        icon?: string;
        clickEvent?: (item: T) => void;
    }[];
}

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
     * @param item como parametro pasa el item de cada elemento de la lista
     * @returns void
     */
    clickEventAdditionalValue?: (item: T) => void;

    /**
     * @description
     * Función que se ejecuta al dar click en el valor de la celda de la columna
     * @example
     * clickEventValue: (item) => { // TODO }
     * @param item como parametro pasa el item de cada elemento de la lista
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

export type ActionButtonType = 'clickEvent';


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

export const defaultNameAndDescriptionColumn = <T = any>(config?: Partial<Omit<StringListColumn<T>, 'type' | 'displayValueFn' | 'displayAdditionalValueFn'>>): ListColumn<T> => ({
    title: 'Nombre',
    gridColumn: '1fr',
    sort: { key: 'name' },
    routerLinkValue: { url: (item: any) => `../detail/${item.id}` },
    displayValueFn: (item: any) => item.name,
    displayAdditionalValueFn: (item: any) => item.description,
    ...config,
})

export const defaultStatusColumn = <T = any>(config?: Partial<Omit<StringListColumn<T>, 'type' | 'title' | 'displayValueFn' | 'cssClassDisplayValue' | 'displayAdditionalValueFn'>>): ListColumn<T> => ({
    type: 'first-letter-uppercase',
    title: 'Estado',
    sort: { key: 'status' },
    align: 'center',
    displayValueFn: (item: any) => item.status,
    cssClassDisplayValue: (item: any) => `status-chip ${item.status}`,
    ...config,
})

export const defaultCreatedAtColumn = <T = any>(config?: Partial<Omit<StringListColumn<T>, 'type' | 'title' | 'displayValueFn' | 'displayAdditionalValueFn'>>): ListColumn<T> => ({
    type: 'date',
    title: 'Creado',
    sort: { key: 'created_at' },
    displayValueFn: (item: any) => item.created_at,
    ...config,
})

export const defaultUpdatedAtColumn = <T = any>(config?: Partial<Omit<StringListColumn<T>, 'type' | 'title' | 'displayValueFn' | 'displayAdditionalValueFn'>>): ListColumn<T> => ({
    type: 'date',
    title: 'Actualizado',
    sort: { key: 'updated_at' },
    hidden: true,
    displayValueFn: (item: any) => item.updated_at,
    ...config,
})

export const getDefaultListColumns = (): ListColumn<any>[] => ([
    defaultNameAndDescriptionColumn(),
    defaultUpdatedAtColumn(),
    defaultCreatedAtColumn(),
    defaultStatusColumn(),
]);


export interface ListFilterInput {
    type: 'select' | 'date' | 'date-range' | 'text' | 'number' | 'switch' | 'checkbox' | 'autocomplete-server' | 'autocomplete-local';
    textLabel: string;
    formControlName: string;

    defaultValue?: any; // for type select | date | text | number

    defaultValueFrom?: any; // for type date-range - from date
    defaultValueTo?: any; // for type date-range - to date

    autocompleteKeyDisplayTextOptions?: string; // for type autocomplete-server
    autocompleteKeyValue?: string; // for type autocomplete-server
    autocompleteParseDataFn?: <T>(data: T[]) => (T[] | Promise<T[]>); // for type autocomplete-server

    autocompleteServerUrl?: string; // for type autocomplete-server and autocomplete-local
    autocompleteQueryParams?: string; // for type autocomplete-server and autocomplete-local

    autocompleteNameModuleDatabase?: NameModuleDatabase; // for type autocomplete-local
    autocompleteConditionFilterFn?: (search: string, item: any) => boolean; // for type autocomplete-local

    cssClass?: string;

    selectOptions?: { text: string, value: any }[] // for selects

}

type SimpleFilter = Pick<ListFilterInput, 'formControlName' | 'textLabel' | 'cssClass' | 'defaultValue'>;
interface SelectFilter extends SimpleFilter {
    selectOptions: { text: string, value: any }[]
}

interface DateRangeFilter extends Omit<SimpleFilter, 'defaultValue'> {
    defaultValueFrom?: Date;
    defaultValueTo?: Date;
}

interface SwitchRangeFilter extends Omit<SimpleFilter, 'defaultValue'> {
    defaultValue?: Boolean;
}

interface CheckboxRangeFilter extends Omit<SimpleFilter, 'defaultValue'> {
    defaultValue?: Boolean;
}

type AutocompleteSimpleFilter = Pick<
    ListFilterInput,
    'formControlName'
    | 'textLabel'
    | 'cssClass'
    | 'defaultValue'
    | 'autocompleteParseDataFn'
    | 'autocompleteKeyDisplayTextOptions'
    | 'autocompleteKeyValue'
>;

interface AutocompleteServerFilter extends AutocompleteSimpleFilter {
    autocompleteServerUrl: string;
    autocompleteQueryParams?: string;
}

interface AutocompleteLocalFilter extends AutocompleteSimpleFilter {
    autocompleteNameModuleDatabase: NameModuleDatabase;
    autocompleteConditionFilterFn?: (search: string, item: any) => boolean;
}



export const getTextFilterInputConfiguration = (inputConfig: SimpleFilter): ListFilterInput => {
    return {
        type: 'text',
        formControlName: inputConfig.formControlName,
        textLabel: inputConfig.textLabel,
        cssClass: inputConfig.cssClass ?? 'col-span-full sm:col-span-4',
        defaultValue: inputConfig.defaultValue ?? null,
    };
}

export const getNumberFilterInputConfiguration = (inputConfig: SimpleFilter): ListFilterInput => {
    return {
        type: 'number',
        formControlName: inputConfig.formControlName,
        textLabel: inputConfig.textLabel,
        cssClass: inputConfig.cssClass ?? 'col-span-full sm:col-span-4',
        defaultValue: inputConfig.defaultValue ?? null,
    };
}

export const getDateRangeFilterInputConfiguration = (inputConfig: DateRangeFilter): ListFilterInput => {
    return {
        type: 'date-range',
        formControlName: inputConfig.formControlName,
        textLabel: inputConfig.textLabel,
        cssClass: inputConfig.cssClass ?? 'col-span-full sm:col-span-4',
        defaultValueFrom: inputConfig.defaultValueFrom,
        defaultValueTo: inputConfig.defaultValueTo,
    };
}

export const getDateFilterInputConfiguration = (inputConfig: SimpleFilter): ListFilterInput => {
    return {
        type: 'date',
        formControlName: inputConfig.formControlName,
        textLabel: inputConfig.textLabel,
        cssClass: inputConfig.cssClass ?? 'col-span-full sm:col-span-4',
        defaultValue: inputConfig.defaultValue ?? null,
    };
}

export const getSelectFilterInputConfiguration = (inputConfig: SelectFilter): ListFilterInput => {
    return {
        type: 'select',
        formControlName: inputConfig.formControlName,
        textLabel: inputConfig.textLabel,
        cssClass: inputConfig.cssClass ?? 'col-span-full sm:col-span-4',
        selectOptions: inputConfig.selectOptions,
        defaultValue: inputConfig.defaultValue ?? null,
    };
}

export const getSwitchFilterInputConfiguration = (inputConfig: SwitchRangeFilter): ListFilterInput => {
    return {
        type: 'switch',
        formControlName: inputConfig.formControlName,
        textLabel: inputConfig.textLabel,
        cssClass: inputConfig.cssClass ?? 'col-span-full',
        defaultValue: inputConfig.defaultValue ?? false,
    };
}

export const getCheckboxFilterInputConfiguration = (inputConfig: CheckboxRangeFilter): ListFilterInput => {
    return {
        type: 'checkbox',
        formControlName: inputConfig.formControlName,
        textLabel: inputConfig.textLabel,
        cssClass: inputConfig.cssClass ?? 'col-span-full',
        defaultValue: inputConfig.defaultValue ?? false,
    };
}

export const getAutocompleteLocalFilterInputConfiguration = (inputConfig: AutocompleteLocalFilter): ListFilterInput => ({
    type: 'autocomplete-local',
    formControlName: inputConfig.formControlName,
    textLabel: inputConfig.textLabel,
    cssClass: inputConfig.cssClass ?? 'col-span-full md:col-span-4',
    defaultValue: inputConfig.defaultValue ?? null,

    autocompleteKeyDisplayTextOptions: inputConfig.autocompleteKeyDisplayTextOptions,
    autocompleteKeyValue: inputConfig.autocompleteKeyValue,
    autocompleteParseDataFn: inputConfig.autocompleteParseDataFn,

    autocompleteNameModuleDatabase: inputConfig.autocompleteNameModuleDatabase,
    autocompleteConditionFilterFn: inputConfig.autocompleteConditionFilterFn,

});

export const getAutocompleteServerFilterInputConfiguration = (inputConfig: AutocompleteServerFilter): ListFilterInput => ({
    type: 'autocomplete-server',
    formControlName: inputConfig.formControlName,
    textLabel: inputConfig.textLabel,
    cssClass: inputConfig.cssClass ?? 'col-span-full md:col-span-4',
    defaultValue: inputConfig.defaultValue ?? null,

    autocompleteKeyDisplayTextOptions: inputConfig.autocompleteKeyDisplayTextOptions,
    autocompleteKeyValue: inputConfig.autocompleteKeyValue,
    autocompleteParseDataFn: inputConfig.autocompleteParseDataFn,

    autocompleteServerUrl: inputConfig.autocompleteServerUrl,
    autocompleteQueryParams: inputConfig.autocompleteQueryParams,
});

export const getCreatedAtRangeFilterInput = (): ListFilterInput => getDateRangeFilterInputConfiguration({ formControlName: 'created_at', textLabel: 'Fecha de creación' });
export const getUpdatedAtRangeFilterInput = (): ListFilterInput => getDateRangeFilterInputConfiguration({ formControlName: 'updated_at', textLabel: 'Fecha de actualización' });
export const getInactiveFilterInput = (): ListFilterInput => getSwitchFilterInputConfiguration({ formControlName: 'inactives', textLabel: 'Registros inactivos' })
