import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { Contract } from '@interface/contract';
import { ItemListConfiguration, dateColumn, defaultCreatedAtColumn, defaultStatusColumn, defaultUpdatedAtColumn, numberColumn, textColumn } from '@interface/itemList';

@Component({
    selector: 'app-client-contract-list-page',
    standalone: true,
    imports: [ItemListTemplateComponent],
    templateUrl: './client-contract-list-page.component.html',
    styleUrl: './client-contract-list-page.component.scss'
})
export class ClientContractListPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router)
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
            defaultCreatedAtColumn(),
            defaultUpdatedAtColumn(),
            defaultStatusColumn(),
        ]),
        menuItem: {
            hiddenOptionEdit: true,
            hiddenOptionDelete: true,
            options: [
                {
                    clickEvent: (item) => this.router.navigate([`../../tracking/contract/view/${item.id}/detail`]),
                    id: 'contract_client',
                    type: 'clickEvent',
                    text: 'Ver en perfil',
                    icon: 'autorenew'
                }
            ]
        }
    };
}
