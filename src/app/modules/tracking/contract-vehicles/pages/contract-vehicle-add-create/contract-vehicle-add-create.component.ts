import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { ItemFormConfiguration, ItemFormTemplateComponent } from '@component/item-form-template/item-form-template.component';
import { ContractPlanVehicle } from '@interface/contractPlanVehicle';
import { FetchService } from '@service/fetch.service';

@Component({
  selector: 'app-contract-vehicle-add-create',
  standalone: true,
  imports: [MatCheckboxModule, ItemFormTemplateComponent],
  templateUrl: './contract-vehicle-add-create.component.html',
  styleUrl: './contract-vehicle-add-create.component.scss'
})
export class ContractVehicleAddCreateComponent {
  private fetch = inject(FetchService);
  private activatedRoute = inject(ActivatedRoute);
  public contractPlanVehicles: ContractPlanVehicle[] = [];

  public configuration: ItemFormConfiguration = {
    type: 'create',
    titleModule: 'Vehículos instalados',
    formGroup: new FormGroup([]),
    server: { url: 'contract-plan-vehicle' },
  };

  ngOnInit(){
    this.getVehicles();
  }

  private async getVehicles() {
    const contractId = this.activatedRoute.snapshot.parent?.parent?.paramMap.get('id');
    this.contractPlanVehicles = await this.fetch.get(`contract/${contractId}/contract-plan-vehicle`);
    console.log(this.contractPlanVehicles);

  }
}
