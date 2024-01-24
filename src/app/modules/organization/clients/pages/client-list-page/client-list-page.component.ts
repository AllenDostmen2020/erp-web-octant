import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent, ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, emailColumn, phoneColumn, textColumn, clickEventActionButton } from '@component/item-list-template/item-list-template.component';
import { Client } from '@interface/client';

@Component({
    selector: 'app-client-list-page',
    standalone: true,
    imports: [ItemListTemplateComponent],
    templateUrl: './client-list-page.component.html',
    styleUrl: './client-list-page.component.scss'
})
export class ClientListPageComponent {
    public configList: ItemListConfiguration<Client> = {
        title: 'Clientes',
        server: {
            url: 'client',
        },
        columns: signal([
            textColumn({
                title: 'Cliente / N° Documento',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../view/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => {
                    console.log('name change');
                    return item?.name ? item.name : '--';
                },
                displayAdditionalValueFn: (item) => item?.document_number.length >= 11 ? 'RUC: ' + item?.document_number : item?.document_number.length == 8 ? 'DNI: ' + item?.document_number : 'OTRO: ' + item?.document_number,
            }),
            emailColumn({
                title: 'Email',
                sort: { key: 'email' },
                gridColumn: 'auto',
                displayValueFn: (item) => {
                    console.log('email change');
                    return item.email;
                },
            }),
            phoneColumn({
                title: 'Teléfono',
                sort: { key: 'phone' },
                gridColumn: 'fit-content(120px)',
                displayValueFn: (item) => item.phone,
            }),
            phoneColumn({
                title: 'Celular',
                sort: { key: 'cellphone' },
                gridColumn: 'fit-content(120px)',
                displayValueFn: (item) => item.cellphone,
            }),
            textColumn({
                title: 'Dirección',
                sort: { key: 'address' },
                gridColumn: 'fit-content(120px)',
                displayValueFn: (item) => item.address,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
        rows: {
            actions: [
                clickEventActionButton({
                    text: 'Emitir',
                    fn: async (item, index, { updateChangesItemFn }) => {
                        updateChangesItemFn(index, { ...item, name: Math.random().toString() });
                    },
                })
            ]
        }
    }
}
