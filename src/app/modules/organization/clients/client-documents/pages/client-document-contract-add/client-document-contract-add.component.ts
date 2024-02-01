import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ItemListConfiguration, ItemListTemplateComponent, dateColumn, numberColumn, textColumn } from '@component/item-list-template/item-list-template.component';
import { Contract } from '@interface/contract';
import { EventsService } from '@service/events.service';
import { LateralPanelType } from 'src/app/sidenav/sidenav/sidenav.component';

@Component({
    selector: 'app-client-document-contract-add',
    standalone: true,
    imports: [ItemListTemplateComponent],
    templateUrl: './client-document-contract-add.component.html',
    styleUrl: './client-document-contract-add.component.scss'
})
export class ClientDocumentContractAddComponent {
    public readonly lateralPanelType: LateralPanelType = 'maximum';
    private location = inject(Location);
    private eventService = inject(EventsService);
    public configuration: ItemListConfiguration<Contract> = {
        title: 'Contratos',
        server: {
            url: 'contract',
            queryParams: { relations: 'client,clientBusinessUnit,plan' },
        },
        columns: signal([
            textColumn({
                title: 'Código',
                displayValueFn: (item) => item.code,
                routerLinkValue: { url: (item) => `/tracking/contract/view/${item.id}` },
            }),
            textColumn({
                title: 'Cliente / Unidad de negocio',
                displayValueFn: (item) => item.client?.name,
                displayAdditionalValueFn: (item) => item.client_business_unit?.name,
                gridColumn: '1fr',
                routerLinkValue: { url: (item) => `/organization/client/view/${item.client?.id}` },
            }),
            textColumn({
                title: 'Plan',
                displayValueFn: (item) => item.plan?.name,
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
        ]),
        rows: {
            actions: [
                {
                    type: 'clickEvent',
                    style: 'filled-icon-button',
                    icon: 'check',
                    fn:  (item) => this.addItem(item)
                }
            ]
        }
    };

    public addItem(item: Contract){
        this.eventService.emitEvent(`add-client-contract`, item);
        this.location.back();
    }
}
