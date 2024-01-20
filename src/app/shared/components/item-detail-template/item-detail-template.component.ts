import {
    Component,
    Input,
    ViewEncapsulation,
    inject,
    signal,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
    ItemDetail,
    ItemDetailConfiguration,
    ItemDetailGroup,
} from 'src/app/shared/interfaces/itemDetail';
import { FetchService } from '@service/fetch.service';
import { SpinnerDefaultComponent } from '../spinner-default/spinner-default.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { GetUserByIdPipe } from '@pipe/get-user-by-id.pipe';
import { DiffDatePipe } from '@pipe/diff-date.pipe';
import { ErrorTemplateComponent } from '../error-template/error-template.component';
import { FetchErrorResponse, RequestInitFetch } from 'src/app/shared/interfaces/fetch';
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

export const registerDataGroupDetail = (): ItemDetailGroup<any> => {
    return {
        title: 'Datos del registro',
        icon: 'app_registration',
        details: [
            {
                title: 'Estado',
                key: 'status',
                type: 'titlecase',
                cssClass: (item) => item.status ?? '',
                displayValueFn: (item) => item.status,
            },
            {
                title: 'Creado',
                key: 'created_at',
                type: 'diff-date',
                displayValueFn: (item) => item.created_at,
            },
            {
                title: 'Creado por',
                key: 'create_user_id',
                type: 'user',
                displayValueFn: (item) => item.create_user_id,
            },
            {
                title: 'Actualizado',
                key: 'updated_at',
                type: 'diff-date',
                displayValueFn: (item) => item.updated_at,
            },
            {
                title: 'Actualizado por',
                key: 'update_user_id',
                type: 'user',
                displayValueFn: (item) => item.update_user_id,
            },
            {
                title: 'Eliminado',
                key: 'deleted_at',
                type: 'diff-date',
                displayValueFn: (item) => item.deleted_at,
            },
            {
                title: 'Eliminado por',
                key: 'delete_user_id',
                type: 'user',
                displayValueFn: (item) => item.delete_user_id,
            },
            {
                title: 'Restaurado por',
                key: 'restore_user_id',
                type: 'user',
                displayValueFn: (item) => item.restore_user_id,
            },
        ],
    };
};
interface TextDetail<T = any> extends ItemDetail<T> {

}
export const textDetail = () => {}

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
        /* -------------------------------------------------- */
        /* ---------------     NEW UPDATE     --------------- */
        /* -------------------------------------------------- */
        if (this.configuration.dataItem && this.configuration.dataItem()) {
            this.configuration.loading = false;
        } else {
            this.configuration.dataItem = signal(null);

            // /* PROVISIONAL POR ELIMINAR */
            // if (this.configuration.item) {
            //     this.configuration.loading = false;
            //     this.configuration.dataItem!.set(this.configuration.item);
            // } else {
            //     this.getItem()
            // };
            // /* PROVISIONAL POR ELIMINAR */

            this.getItem();
        }
        /* -------------------------------------------------- */
        /* ---------------     END UPDATE     --------------- */
        /* -------------------------------------------------- */
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
            const { itemPathServer, ignoreShowError } = this.configuration;
            let queryParams = this.configuration.queryParams ?? {};
            if (queryParams instanceof Object) {
                queryParams = objectToURLSearchParams(queryParams);
                queryParams = queryParams.toString();
            }
            const url = `${itemPathServer}/${this.configuration.itemId}?${queryParams ? queryParams : ''}`;
            const requestInit: RequestInitFetch = { signal: this.abortController.signal };
            if (ignoreShowError) requestInit.ignoreInterceptErrors = true;
            let response: T = await this.fetch.get<T>(url, requestInit);

            /* -------------------------------------------------- */
            /* ---------------     NEW UPDATE     --------------- */
            /* -------------------------------------------------- */
            const { parseItemFn } = this.configuration;
            this.configuration.dataItem!.set((await parseItemFn?.(response)) ?? response);

            const { afterSetItemFn } = this.configuration;
            if (afterSetItemFn) afterSetItemFn(this.configuration.dataItem!()!);
            /* -------------------------------------------------- */
            /* ---------------     END UPDATE     --------------- */
            /* -------------------------------------------------- */
        } catch (error) {
            this.configuration.httpError = error as FetchErrorResponse;
            const { interceptHttpErrorItemFn } = this.configuration;
            if (interceptHttpErrorItemFn) interceptHttpErrorItemFn(this.configuration.httpError);
        }
        this.configuration.loading = false;
    }

    public async deleteItem() {
        const url = `${this.configuration.itemPathServer}/${this.configuration.itemId}`;
        const response = await this.fetch.delete(url);
        const { afterDeleteItemFn } = this.configuration;
        if (afterDeleteItemFn) afterDeleteItemFn(response);
        this.location.back();
    }

    public async restoreItem() {
        const url = `${this.configuration.itemPathServer}/${this.configuration.itemId}/restore`;
        const confirmDialog: ConfirmDialogData = {
            icon: 'autorenew',
            title: '¿Deseas restaurar este registro?',
            description: 'Esta acción restaurará el registro eliminado. Una vez que se haya completado la restauración, el registro volverá a estar visible en la lista principal y se podrá acceder a él como antes.',
        };
        const response = await this.fetch.put<any>(url, {}, { confirmDialog });
        const { afterRestoreItemFn } = this.configuration;
        if (afterRestoreItemFn) afterRestoreItemFn(response);
        this.configuration.dataItem?.update(item => ({...item!, ...response}));
    }
}
