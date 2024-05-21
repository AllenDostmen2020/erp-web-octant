import { Component } from '@angular/core';
import { ItemDetailConfiguration, ItemDetailTemplateComponent, registerDataGroupDetail } from '@component/item-detail-template/item-detail-template.component';
import { ContractPlanVehicle } from '@interface/contractPlanVehicle';
import { Vehicle } from '@interface/vehicle';

@Component({
  selector: 'app-contract-vehicle-detail-page',
  standalone: true,
  imports: [ItemDetailTemplateComponent],
  templateUrl: './contract-vehicle-detail-page.component.html',
  styleUrl: './contract-vehicle-detail-page.component.scss'
})
export class ContractVehicleDetailPageComponent {
  public configuration: ItemDetailConfiguration<Vehicle> = {
    title: 'Detalles',
    server: { 
      url: 'vehicle',
      queryParams: { relations: 'client,vehicleType' }
    },
    groups: [
      // {
      //   title: 'Datos generales',
      //   icon: 'document',
      //   details: [
      //     {
      //       title: 'Fecha de instalación',
      //       displayValueFn: (item)=> item.installation_date,
      //       type: 'date',
      //     },
      //     {
      //       title: 'IMEI del GPS',
      //       displayValueFn: (item)=> item.gps_imei,
      //       type: 'date',
      //     }
      //   ]
      // },
        {
            title: 'Datos del vehículo',
            icon: 'account_circle',
            details: [
              {
                title: 'Cliente',
                displayValueFn: (item) => item.client?.name,
            },
              {
                title: 'Tipo de vehículo',
                displayValueFn: (item) => item.vehicle_type?.name,
            },
            {
                title: 'Placa',
                displayValueFn: (item) => item.plate
            },
            {
                title: 'Color',
                displayValueFn: (item) => item.color
            },
            {
                title: 'Modelo',
                displayValueFn: (item) => item.model
            },
            {
                title: 'Año',
                displayValueFn: (item) => item.year
            },
            {
                title: 'Descripción',
                displayValueFn: (item) => item.description
            },
            ]
        },
        registerDataGroupDetail(),
    ]
}
}
