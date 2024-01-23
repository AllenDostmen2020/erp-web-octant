import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { ClientContact } from '@interface/clientContact';
import { ItemListConfiguration, defaultCreatedAtColumn, defaultStatusColumn, defaultUpdatedAtColumn, emailColumn, phoneColumn, textColumn } from '@interface/itemList';

@Component({
  selector: 'app-client-contact-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './client-contact-list-page.component.html',
  styleUrl: './client-contact-list-page.component.scss'
})
export class ClientContactListPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    public configList: ItemListConfiguration<ClientContact> = {
        title: 'Contactos',
        serverUrl: 'client-contact',
        queryParams: {
            client_id: this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id')
        },
        columns: signal([
            textColumn({
                title: 'Cliente / N° Documento',
                sort: { key: 'name' },
                routerLinkValue: { url: (item) => `../detail/${item.id}` },
                gridColumn: '1fr',
                displayValueFn: (item) => item?.name ? item.name : '--',
                displayAdditionalValueFn: (item) => item?.document_number.length >= 11 ? 'RUC: ' + item?.document_number : item?.document_number.length == 8 ? 'DNI: ' + item?.document_number : 'OTRO: ' + item?.document_number,
            }),
            emailColumn({
                title: 'Email',
                sort: { key: 'email' },
                gridColumn: 'auto',
                displayValueFn: (item) => item.email,
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
            defaultCreatedAtColumn(),
            defaultUpdatedAtColumn(),
            defaultStatusColumn(),
        ]),
    }
}
