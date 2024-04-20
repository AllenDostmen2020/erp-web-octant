import {
    Component,
    EventEmitter,
    Input,
    TemplateRef,
    ViewEncapsulation,
    WritableSignal,
    inject,
    signal,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FetchService } from '@service/fetch.service';
import { SpinnerDefaultComponent } from '../spinner-default/spinner-default.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { GetUserByIdPipe } from '@pipe/get-user-by-id.pipe';
import { DiffDatePipe } from '@pipe/diff-date.pipe';
import { ErrorTemplateComponent } from '../error-template/error-template.component';
import { FetchErrorResponse, RequestInitFetch } from '@interface/fetch';
import { ListFormatPipe } from '@pipe/list-format.pipe';
import { FirstLetterUppercasePipe } from '@pipe/first-letter-uppercase.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NavigateLateralPanelOutletDirective } from '@directive/navigate-lateral-panel-outlet.directive';
import { MatMenuModule } from '@angular/material/menu';
import { GeneratePathUrlPipe } from '@pipe/generate-path-url.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExecuteFunctionPipe } from '@pipe/execute-function.pipe';
import { GetMixedValuePipe } from '@pipe/get-mixed-value.pipe';
import { objectToURLSearchParams } from '@utility/queryParams';
import { ConfirmDialogData } from '@component/confirm-dialog-template/confirm-dialog-template.component';
import { TypeValueKeyItem } from '@component/item-list-template/item-list-template.component';

@Component({
    selector: 'app-item-detail-template',
    standalone: true,
    imports: [
        CommonModule,
        SpinnerDefaultComponent,
        RouterLink,
        PathFilesServerPipe,
        GetUserByIdPipe,
        DiffDatePipe,
        ErrorTemplateComponent,
        ListFormatPipe,
        FirstLetterUppercasePipe,
        ScrollingModule,
        NavigateLateralPanelOutletDirective,
        MatMenuModule,
        GeneratePathUrlPipe,
        MatTooltipModule,
        ExecuteFunctionPipe,
        GetMixedValuePipe,
    ],
    templateUrl: './item-detail-template.component.html',
    styleUrls: ['./item-detail-template.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ItemDetailTemplateComponent {
    @Input({ required: true }) configuration!: ItemDetailConfiguration;

    public location = inject(Location);
    private fetch = inject(FetchService);
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);

    private abortController = new AbortController();

    ngOnInit(): void {
        this.setItemId();

        if (this.configuration.dataItem && this.configuration.dataItem()) {
            this.configuration.loading = false;
        } else {
            this.configuration.dataItem = signal(null);
            this.getItem();
        }

        if (this.configuration.updateItemEvent) this.configuration.updateItemEvent.subscribe(() => this.getItem());
    }

    ngOnDestroy() {
        this.abortController.abort();
    }


    private setItemId() {
        if (!this.configuration.itemId) {
            if (this.activatedRoute.snapshot.paramMap.get('id')) {
                this.configuration.itemId = this.activatedRoute.snapshot.paramMap.get('id')!;
            } else if (this.activatedRoute.parent?.snapshot.paramMap.get('id')) {
                this.configuration.itemId = this.activatedRoute.parent?.snapshot.paramMap.get('id')!;
            } else if (this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')) {
                this.configuration.itemId = this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!;
            }
        }
    }

    public navigateEdit() {
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
            this.router.navigate([`../../edit/${this.configuration.itemId}`], { relativeTo: this.activatedRoute });
        } else if (this.activatedRoute.parent?.snapshot.paramMap.get('id')) {
            this.router.navigate([`./edit`], { relativeTo: this.activatedRoute });
        } else if (this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')) {
            this.router.navigate([`./edit`], { relativeTo: this.activatedRoute });
        }
    }


    public async getItem<T = any>() {
        this.configuration.loading = true;
        try {
            const { server, ignoreShowError } = this.configuration;
            const queryParams = objectToURLSearchParams(server.queryParams ?? {}).toString();

            const url = `${server.url}/${this.configuration.itemId}?${queryParams ? queryParams : ''}`;
            const requestInit: RequestInitFetch = { signal: this.abortController.signal };
            if (ignoreShowError) requestInit.ignoreInterceptErrors = true;
            let response: T = await this.fetch.get<T>(url, requestInit);

            const { parseItemFn } = this.configuration;
            this.configuration.dataItem!.set((await parseItemFn?.(response)) ?? response);

            const { afterSetItemFn } = this.configuration;
            if (afterSetItemFn) afterSetItemFn(this.configuration.dataItem!()!);
        } catch (error) {
            this.configuration.httpError = error as FetchErrorResponse;
            const { interceptHttpErrorItemFn } = this.configuration;
            if (interceptHttpErrorItemFn) interceptHttpErrorItemFn(this.configuration.httpError);
        }
        this.configuration.loading = false;
    }

    public async deleteItem() {
        const url = `${this.configuration.server.url}/${this.configuration.itemId}`;
        const response = await this.fetch.delete(url);
        const { afterDeleteItemFn } = this.configuration;
        if (afterDeleteItemFn) afterDeleteItemFn(response);
        this.location.back();
    }

    public async restoreItem() {
        const url = `${this.configuration.server.url}/${this.configuration.itemId}/restore`;
        const confirmDialog: ConfirmDialogData = {
            icon: 'autorenew',
            title: '¿Deseas restaurar este registro?',
            description: 'Esta acción restaurará el registro eliminado. Una vez que se haya completado la restauración, el registro volverá a estar visible en la lista principal y se podrá acceder a él como antes.',
        };
        const response = await this.fetch.put<any>(url, {}, { confirmDialog });
        const { afterRestoreItemFn } = this.configuration;
        if (afterRestoreItemFn) afterRestoreItemFn(response);
        this.configuration.dataItem?.update(item => ({ ...item!, ...response }));
    }
}

export interface ItemDetailConfiguration<T = any> {
    title: string;
    subtitle?: ((item: T) => string | number | null | undefined) | false;
    itemId?: string;
    server: {
        url: string;
        queryParams?: { [key: string]: any };
    }
    loading?: boolean;
    groups: ItemDetailGroup<T>[];
    dataItem?: WritableSignal<T | null>;
    parseItemFn?: (item: T) => (T | Promise<T>);
    afterSetItemFn?: (item: T) => void;
    afterDeleteItemFn?: (item: T) => void;
    afterRestoreItemFn?: (item: T) => void;

    editButton?: {
        text?: string;
        routerLink?: RouterLinkItem<T>
    } | false;

    deleteButton?: boolean;
    restoreButton?: boolean;
    backButton?: boolean;
    actionButtons?: ActionButton<T, ActionButtonType>[];
    ignoreShowError?: boolean;
    interceptHttpErrorItemFn?: (error: FetchErrorResponse) => void;
    httpError?: FetchErrorResponse;
    hiddeHeader?: boolean;
    updateItemEvent?: EventEmitter<boolean>;
}

export interface ItemDetailGroup<T = any> {
    icon?: string,
    title?: string,
    details: ItemDetail<T>[]
    template?: {
        ref: TemplateRef<any>,
        position?: 'before' | 'after',
    },
    actions?: ActionButton<T>[]
}

export interface ItemDetail<T> {
    clickEvent?: (item: T) => void;
    cssClass?: ((item: T) => string) | string;
    hidden?: (item: T) => boolean;
    dateFormat?: string;
    displayValueFn: (item: T) => string | number | null | undefined | string[];
    key?: string;
    title: string;
    numberFormat?: string;
    routerLink?: RouterLinkItem<T>
    tooltip?: ((item: T) => string) | string;
    type?: TypeValueKeyItem | 'image' | 'image-server' | 'private-image-server' | 'html';
}

export interface ActionButton<T, Type = 'clickEvent'> {
    type?: Type;
    style: StyleButton;
    icon?: string;
    text?: string;
    title?: string;
    clickEvent: (item: T) => void;
    hidden?: (item: T) => boolean;
}

export const actionButton = <T>(config: Omit<ActionButton<T, 'clickEvent'>, 'type'>): ActionButton<T, 'clickEvent'> => ({ ...config, type: 'clickEvent' });

export type StyleButton = 'filled-button' | 'tonal-button' | 'text-button' | 'outlined-button' | 'elevated-button' | 'icon-button' | 'tonal-icon-button' | 'filled-icon-button' | 'outlined-icon-button';

export type ActionButtonType = 'clickEvent' | 'update' | 'delete' | 'restore';

export interface RouterLinkItem<T> {
    url: ((item: T) => string) | string;
    outlet?: 'route-lateral' | 'principal';
    queryParams?: { [key: string]: any },
    state?: ((item: T) => (string | { [key: string]: any } | any[] | number | null)) | string | { [key: string]: any } | any[] | number | null;
}


export const registerDataGroupDetail = (): ItemDetailGroup<any> => {
    return {
        title: 'Datos del registro',
        icon: 'app_registration',
        details: [
            htmlDetail({
                title: 'Estado',
                tooltip: 'Estado',
                displayValueFn: (item: any) => `
                    <span class="status-chip" title="${item.status}">
                        ${(item.status as string).replace(/\w\S*/g, (txt) =>  txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())}
                    </span>`,
            }),
            diffDateDetail({
                title: 'Creado',
                displayValueFn: (item) => item.created_at,
            }),
            userDetail({
                title: 'Creado por',
                displayValueFn: (item) => item.create_user_id,
            }),
            diffDateDetail({
                title: 'Actualizado',
                displayValueFn: (item) => item.updated_at,
            }),
            userDetail({
                title: 'Actualizado por',
                displayValueFn: (item) => item.update_user_id,
            }),
            diffDateDetail({
                title: 'Eliminado',
                displayValueFn: (item) => item.deleted_at,
            }),
            userDetail({
                title: 'Eliminado por',
                displayValueFn: (item) => item.delete_user_id,
            }),
            userDetail({
                title: 'Restaurado por',
                displayValueFn: (item) => item.restore_user_id,
            }),
        ],
    };
};

interface SimpleDetail<T> extends Omit<ItemDetail<T>, 'numberFormat' | 'dateFormat' | 'type'> { }
interface NumberDetail<T> extends SimpleDetail<T> { numberFormat?: string; }
interface DateDetail<T> extends SimpleDetail<T> { dateFormat?: string; }
export const textDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'text' });
export const numberDetail = <T>(options: NumberDetail<T>): ItemDetail<T> => ({ ...options, type: 'number' });
export const diffDateDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'diff-date' });
export const dateDetail = <T>(options: DateDetail<T>): ItemDetail<T> => ({ ...options, type: 'date' });
export const titlecaseDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'titlecase' });
export const uppercaseDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'uppercase' });
export const lowercaseDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'lowercase' });
export const htmlDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'html' });
export const firstLetterUppercaseDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'first-letter-uppercase' });
export const emailDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'email' });
export const phoneDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'phone' });
export const userDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'user' });
export const imageColumnDetail = <T>(options: SimpleDetail<T>): ItemDetail<T> => ({ ...options, type: 'image' });