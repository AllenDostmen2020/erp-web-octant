import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractResolution } from '@interface/contractResolution';
import { ItemDetailConfiguration } from '@interface/itemDetail';

@Component({
  selector: 'app-contract-resolution-detail',
  templateUrl: './contract-resolution-detail.component.html',
  styleUrls: ['./contract-resolution-detail.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractResolutionDetailComponent {
  private activatedRoute = inject(ActivatedRoute);
  public notRegisterData: WritableSignal<boolean> = signal(false);
  public configuration: ItemDetailConfiguration<ContractResolution> = {
    title: 'Resolución de contracto',
    itemPathServer: 'contract-resolution',
    backButton: false,
    ignoreShowError: true,
    itemId: this.activatedRoute.parent?.parent?.snapshot.paramMap.get('id')!,
    interceptHttpErrorItemFn: (error) => {
      if (error.status == 404) {
        this.notRegisterData.set(true);
      }
    },
    groups: [
      // {
      //   details: [
      //     {
      //       label: 'Tipo de resolución',
      //       key: 'type',
      //       type: 'first-letter-uppercase',
      //     },
      //     {
      //       label: 'Entidad resolutora',
      //       key: 'resolution_entity',
      //       type: 'first-letter-uppercase',
      //     },
      //     {
      //       label: 'Motivo',
      //       key: 'reason',
      //     }, 
      //     {
      //       label: 'Acuerdo mutuo',
      //       key: 'mutual_agreement',
      //     },
      //     {
      //       label: 'Descargo de la otra parte',
      //       key: 'discharge_from_other_party',
      //     },
      //     {
      //       label: 'Acuerdo final',
      //       key: 'final_agreement',
      //     },
      //   ]
      // },
      // {
      //   icon: 'location_away',
      //   title: 'Responsable por parte del cliente',
      //   details: [
      //     {
      //       key: 'client_responsible_document_number',
      //       label: 'N° de documento',
      //     },
      //     {
      //       key: 'client_responsible_name',
      //       label: 'Nombre',
      //     },
      //     {
      //       key: 'client_responsible_role',
      //       label: 'Rol / Cargo',
      //     }
      //   ]
      // },
      // {
      //   icon: 'account_box',
      //   title: 'Responsable por parte de la empresa',
      //   details: [
      //     {
      //       key: 'responsible_user_id',
      //       label: 'Usuario',
      //       type: 'user',
      //       includeUserRole: true,
      //     },
      //   ]
      // },
      // detailItemRegisterDataGroup(),
    ],
  }

}
