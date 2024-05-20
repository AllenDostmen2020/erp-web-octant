import { Component, signal } from '@angular/core';
import { dateRangeFormInput, switchFormInput } from '@component/item-form-template/item-form-template.component';
import { ItemListTemplateComponent, ItemListConfiguration, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, emailColumn, phoneColumn, textColumn, clickEventActionButton, viewItemActionButton, editItemActionButton, deleteItemActionButton, restoreItemActionButton, changeStatusItemActionButton, statusFilterFormInput } from '@component/item-list-template/item-list-template.component';
import { StatusModel } from '@interface/baseModel';
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
                displayValueFn: (item) => item?.name ? item.name : '--',
                displayAdditionalValueFn: (item) => `${item.document_type.toUpperCase()}: ${item.document_number}`,
                principal: true,
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
                displayValueFn: (item) => item.code_phone ? `(${item.code_phone}) ${item.phone}` : `(--) ${item.phone}`,
            }),
            phoneColumn({
                title: 'Celular',
                sort: { key: 'cellphone' },
                gridColumn: 'fit-content(120px)',
                displayValueFn: (item) => item.code_cellphone ? `(${item.code_cellphone}) ${item.cellphone}` : `(--) ${item.cellphone}`,
            }),
            textColumn({
                title: 'Dirección',
                sort: { key: 'address' },
                gridColumn: 'fit-content(120px)',
                displayValueFn: (item) => item.address,
                hidden: true,
            }),
            itemCreatedAtColumn(),
            itemUpdatedAtColumn(),
            itemStatusColumn(),
        ]),
        filter: {
            inputs: signal([
                statusFilterFormInput([StatusModel.Activo, StatusModel.Inactivo]),
                dateRangeFormInput({
                    textLabel: 'Fechas',
                    formControlNameFrom: 'updated_at_from',
                    formControlNameTo: 'updated_at_to',
                }),
                switchFormInput({
                    textLabel: 'Incluir registros inactivos',
                    formControlName: 'inactive',
                }),
                switchFormInput({
                    textLabel: 'Solo registros inactivos',
                    formControlName: 'only_inactive',
                }),
            ])
        },
        rows: {
            options: [
                viewItemActionButton(),
                editItemActionButton(),
                changeStatusItemActionButton(
                    {
                        icon: (item) => item.status == StatusModel.Activo ? 'do_not_disturb_on' : 'check_circle',
                        text: (item) => item.status == StatusModel.Activo ? 'Desactivar' : 'Activar',
                    },
                    {
                        'activo': 'inactivo',
                        'inactivo': 'activo',
                        'habilitado': 'activo',
                    }
                ),
                deleteItemActionButton(),
                restoreItemActionButton(),
            ]
        }
    }
}
