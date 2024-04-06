import { Component } from '@angular/core';
import { ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ContractInstallation } from '@interface/contractInstallation';
import { ItemDetailConfiguration } from '@interface/itemDetail';

@Component({
  selector: 'app-contract-installation-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './contract-installation-detail-page.component.html',
  styleUrl: './contract-installation-detail-page.component.scss'
})
export class ContractInstallationDetailPageComponent {
  public configuration: ItemDetailConfiguration<ContractInstallation> = {
    title: 'Detalles',
    server: { 
      url: 'contract-installation',
      queryParams: {
        relations: 'contractPlanVehicles.vehicle'
      }
     },
    groups: [
        {
            title: 'Datos generales',
            icon: 'account_circle',
            details: [
                {
                    title: 'Responsable',
                    displayValueFn: (item) => `${item.responsible_name} ${item.responsible_paternal_name} ${item.responsible_maternal_name}`
                },
                {
                    title: 'Observación',
                    displayValueFn: (item) => item.observation
                },
                {
                    title: 'Fecha de instalación',
                    displayValueFn: (item) => item.date,
                    type: 'date'
                },
                {
                    title: 'Vehículos instalados',
                    displayValueFn: (item) => item.contract_plan_vehicles?.map((contractPlanVehicle) => contractPlanVehicle.vehicle?.plate).join(', ')
                },
            ]
        },
        registerDataGroupDetail(),
    ]
}
}
