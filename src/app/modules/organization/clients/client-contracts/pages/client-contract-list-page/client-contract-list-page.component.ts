import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemListTemplateComponent, clickEventActionButton, routerLinkActionButton, uppercaseColumn } from '@component/item-list-template/item-list-template.component';
import { Contract } from '@interface/contract';
import { ItemListConfiguration, dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { contractColumnsList } from 'src/app/modules/tracking/contracts/helpers';

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
        server: {
            url: 'contract',
            queryParams: {
                relations: 'plan',
                client_id: this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')
            },
        },
        createButton: false,
        columns: signal(contractColumnsList().toSpliced(1, 2, uppercaseColumn<Contract>({
            title: 'Plan',
            displayValueFn: (item) => item.plan?.name,
            gridColumn: '1fr',
        }))),
        rows: {
            options: [
                routerLinkActionButton({
                    text: 'Ver detalle',
                    icon: 'visibility',
                    routerLink: { url: (item) => `../detail/${item.id}` },
                }),
                routerLinkActionButton({
                    text: 'Ver en perfil',
                    icon: 'autorenew',
                    routerLink: { url: (item) => `/tracking/contract/view/${item.id}/detail` },
                })
            ]
        }
    };
}
