import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ItemDetailTemplateComponent, actionButton, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { Contract } from '@interface/contract';
import { ItemDetailConfiguration } from '@component/item-detail-template/item-detail-template.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertConfiguration, AlertTemplateComponent } from '@component/alert-template/alert-template.component';
import { StatusModel } from '@interface/baseModel';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-contract-detail-page',
    standalone: true,
    imports: [ItemDetailTemplateComponent, AlertTemplateComponent],
    templateUrl: './contract-detail-page.component.html',
    styleUrl: './contract-detail-page.component.scss',
    providers: [DecimalPipe],
})
export class ContractDetailPageComponent {
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    private decimalPipe = inject(DecimalPipe);
    public alertConfiguration: WritableSignal<null | AlertConfiguration> = signal(null);
    public configuration: ItemDetailConfiguration<Contract> = {
        title: 'Detalles',
        subtitle: false,
        editButton: false,
        deleteButton: false,
        server: {
            url: 'contract',
            queryParams: {
                relations: 'client,clientBusinessUnit,contractPlans.plan'
            },
        },
        backButton: false,
        groups: [
            {
                title: 'Datos generales',
                icon: 'account_circle',
                details: [
                    {
                        title: 'Cliente',
                        displayValueFn: (item) => item.client?.name
                    },
                    {
                        title: 'Código',
                        displayValueFn: (item) => item.code
                    },
                    {
                        title: 'Unidad de negocio',
                        displayValueFn: (item) => item.client_business_unit?.name
                    },
                    {
                        title: 'Fecha de instalación',
                        displayValueFn: (item) => item.installation_date,
                        type: 'date',
                    },
                    {
                        title: 'Fecha de inicio',
                        displayValueFn: (item) => item.start_date,
                        type: 'date',
                    },
                    {
                        title: 'Fecha de fin',
                        displayValueFn: (item) => item.end_date,
                        type: 'date',
                    },
                    {
                        title: 'Periodo',
                        displayValueFn: (item) => `${item.period} Meses`
                    },
                    {
                        title: 'Cantidad',
                        displayValueFn: (item) => item.quantity,
                    },
                    {
                        title: 'Recurrente',
                        displayValueFn: (item) => item.recurrent_type.toUpperCase(),
                    },
                    {
                        title: 'Precio de compra',
                        displayValueFn: (item) => item.buy_price,
                        type: 'currency',
                    },
                    {
                        title: 'Precio de venta',
                        displayValueFn: (item) => item.sale_price,
                        type: 'currency',
                    },
                    {
                        title: 'Precio de instalación',
                        displayValueFn: (item) => item.installation_price,
                        type: 'currency',
                    },
                    {
                        title: 'N° de vehículos',
                        displayValueFn: (item) => item.contract_plans?.reduce((previousValue, item) => previousValue + Number(item.quantity), 0),
                        type: 'number',
                        numberFormat: '2.0-0',
                    },
                    {
                        title: 'Planes',
                        type: 'html',
                        displayValueFn: (item) => item.contract_plans?.map(
                            (contractPlan) => `${contractPlan.plan?.name} - ${this.decimalPipe.transform(contractPlan.quantity, '2.0-0')} unidades [S/${this.decimalPipe.transform(contractPlan.sale_price, '.2-2')}]`
                        ).join(', ')
                    },
                ]
            },
            registerDataGroupDetail(),
        ],
        afterSetItemFn: (item) => {
            if (item.status == StatusModel.Expirado) {
                this.alertConfigurationMessage();
            }
        }
    }

    private async alertConfigurationMessage() {
        this.alertConfiguration!.set({
            icon: 'warning',
            title: 'Este contrato ya expiró',
            description: `¿Desea renovar el contrato?`,
            actionButton: {
                icon: 'event_repeat',
                text: 'Renovar',
                fn: () => this.router.navigate([`../renew`], { relativeTo: this.activatedRoute })
            }
        });
    }
}
