import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemListTemplateComponent, clickEventActionButton, routerLinkActionButton } from '@component/item-list-template/item-list-template.component';
import { Contract } from '@interface/contract';
import { ItemListConfiguration, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn } from '@component/item-list-template/item-list-template.component';

@Component({
    selector: 'app-client-contract-list-page',
    standalone: true,
    imports: [ItemListTemplateComponent],
    templateUrl: './client-contract-list-page.component.html',
    styleUrl: './client-contract-list-page.component.scss'
})
export class ClientContractListPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    public configuration: ItemListConfiguration<Contract> = {
        title: 'Contratos',
        serverUrl: 'contract',
        queryParams: {
            relations: 'plan',
            client_id: this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')
        },
        createButton: false,
        columns: signal([
            textColumn({
                title: 'Código',
                displayValueFn: (item) => item.code,
                routerLinkValue: {
                    url: (item) => `../detail/${item.id}`,
                }
            }),
            textColumn({
                title: 'Plan',
                displayValueFn: (item) => item.plan?.name,
                routerLinkValue: {
                    url: (item) => `../detail/${item.id}`,
                }
            }),
            numberColumn({
                title: 'Unidades',
                displayValueFn: (item) => item.quantity,
                numberFormat: '2.0-0',
            }),
            numberColumn({
                title: 'Precio Und.',
                displayValueFn: (item) => item.sale_price,
            }),
            dateColumn({
                title: 'Fecha de inicio',
                displayValueFn: (item) => item.start_date,
            }),
            dateColumn({
                title: 'Fecha de fin',
                displayValueFn: (item) => item.end_date,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
        rows: {
            options: [
                routerLinkActionButton({
                    text: 'Ver detalle',
                    icon: 'visibility',
                    routerLink: { url: (item) => `../detail/${item.id}`},
                }),
                routerLinkActionButton({
                    text: 'Ver en perfil',
                    icon: 'autorenew',
                    routerLink: { url: (item) => `/tracking/contract/view/${item.id}/detail`},
                })
            ]
        }
    };
}
