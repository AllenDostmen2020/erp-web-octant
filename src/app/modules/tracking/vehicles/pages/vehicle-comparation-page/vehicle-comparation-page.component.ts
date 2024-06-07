import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemDetailConfiguration, ItemDetailTemplateComponent } from '@component/item-detail-template/item-detail-template.component';
import { FetchService } from '@service/fetch.service';

@Component({
  selector: 'app-vehicle-comparation-page',
  standalone: true,
  imports: [
    ItemDetailTemplateComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './vehicle-comparation-page.component.html',
  styleUrl: './vehicle-comparation-page.component.scss'
})
export class VehicleComparationPageComponent {
  private fetch = inject(FetchService);
  public configuration:ItemDetailConfiguration = {
    title: 'Comparación de vehículos',
    server: {url: ''},
    dataItem: signal([]),
    groups: []
  }

  public form = new FormGroup({
    document_id: new FormControl('', [Validators.required]),
    plates_compare: new FormControl('', [Validators.required]),
  });

  public listEquals1 = signal<string[]>([]);
  public listEquals2 = signal<string[]>([]);

  public listDifferences1 = signal<string[]>([]);
  public listDifferences2 = signal<string[]>([]);

  public async comparator() {
    console.log(plates01.join(','));
    
    if(this.form.invalid) return;
    const documentId = this.form.get('document_id')!.value;
    const plates:string = this.form.get('plates_compare')!.value as string;
    let items01 = plates.split(',');
    items01 = items01.map((item:string) => item.trim().replaceAll(/[\-\s]+/g, '').toUpperCase());
    let items02 = await this.fetch.get<string[]>(`get-plates-in-document/${documentId}`);
    items02 = items02.map((item:string) => item.trim().replaceAll(/[\-\s]+/g, '').toUpperCase());
    items01.sort();
    items02.sort();
    

    // second step: compare the plates and add to the lists the equals and differences
    const listEquals = [];
    const listDifferences1 = [];
    const listDifferences2 = [];

    for await (const iterator of items01) {
      if (items02.includes(iterator)) {
        listEquals.push(iterator);
      } else {
        listDifferences1.push(iterator);
      }
    }

    for await (const iterator of items02) {
      if (!items01.includes(iterator)) {
        listDifferences2.push(iterator);
      }
    }

    this.listEquals1.set(listEquals);
    this.listEquals2.set(listEquals);

    this.listDifferences1.set(listDifferences1);
    this.listDifferences2.set(listDifferences2);

  }
}


const plates01 = [
  'C6J824',
  'A7N823',
  'B5V842',
  'A4R809',
  'A7N822',
  'P1R889',
  'T7J861',
  'ABJ805',
  'M4R710',
  'AM0905',
  'ANT874',
  'C6L700',
  'F8S766',
  'A6L927',
  'M2X739',
  'BFI922',
  'P3O771',
  'ANW896',
  'ARN836',
  'ARN917',
  'C4Z745',
  'C5S927',
  'F8Q888',
  'ABI836',
  'ANU794',
  'P1N910',
  'T6F857',
  'T6F864',
  'ALS828',
  'AMN912',
  'AVL781',
  'B5V805',
  'P1Y920',
  'P3O881',
  'T5G881',
  'AFN886',
  'F8D934',
  'BFH852',
  'P3M881',
  'BFI817',
  'BFR730',
  'BNH735',
  'BNH712',
  'BNG892',
  'BNG862',
  'BNH795',
  'BNH865',
  'BNG758',
  'BNI736',
  'BNG928',
  'BNH86',
  'P2J236',
  'P3F912',
  'A3T845',
  'P2Y780',
  'P3O713',
  'P3W876',
  'P3Z855',
  'ARN737',
  'B7C795',
  'M1R800',
  'AKG938',
  'AKI885',
  'ALI785',
  'AUR773',
  'AUR805',
  'AUS729',
  'B4X706',
  'B9W924',
  'C6K799',
  'C4J776',
  'ALY844',
  'ALY906',
  'AMA711',
  'AMB777',
  'D1I730',
  'D1K708',
  'D5M763',
  'AVH706',
  'M3Q849',
  'BSC865',
  'BSC900',
  'BSC917',
  'BSD716',
  'BSD900',
  'BPT919',
  'BPT788',
  'BPS757',
  'BPS816',
  'BPS848',
  'D0S862',
  'P3M862',
  'TBM926',
  'TBM898',
  'TBM815',
  'TBM893',
  'AVN717',
  'B7C714',
  'F2Q707',
  'F6P860',
  'M3Q850',
  'T4I907',
  'ATP839',
  'ATQ719',
  'ATQ821',
  'AUS715',
  'D1K765',
  'ASI869',
  'ASU748',
  'ASU862',
  'AVB843',
  'AVM877',
  'AVN709',
  'AVO818',
  'M2X793',
  'T4I868',
  'T7J860',
  'A0Z928',
  'C4J778',
  'T7J857',
  'T8V933',
  'A0Z931',
  'A6L928',
  'AMQ859',
  'M2X740',
  'P1Y906',
  'T6F863',
  'ARN913',
  'AVN758',
  'P2U316',
  'P2W784',
  'P3U806',
  'T7D811',
  'T2E388',
  'BFI890',
  'BFJ724',
  'P1A942',
  'T5G867',
  'BFK729',
  'BFK879',
  'AJY829',
  'AKF795',
  'AKH828',
  'ATQ755',
  'AUR746',
  'B9W928',
  'A5M917',
  'F2P842',
  'M2X741',
];

const plates02 = [
  "AM0905",
  "ANT874",
  "C6L700",
  "F8S766",
  "A6L927",
  "M2X739",
  "ABJ805",
  "M4R710",
  "A4R809",
  "A7N822",
  "P1R889",
  "T7J861",
  "A7N823",
  "B5V842",
  "A5M917",
  "M2X741",
  "AJY829",
  "AKF795",
  "AKH828",
  "ATQ755",
  "AUR746",
  "B9W928",
  "ARN913",
  "AVN758",
  "P2U316",
  "P2W784",
  "P3U806",
  "T7D811",
  "T2E388",
  "BFI890",
  "P3O771",
  "BFJ724",
  "P1A942",
  "T5G867",
  "BFK729",
  "BFK879",
  "T6F863",
  "C6J824",
  "BFH852",
  "P3M881",
  "BFI817",
  "BFR730",
  "AFN886",
  "F8D934",
  "AVN717",
  "B7C714",
  "F6P860",
  "M3Q850",
  "T4I907",
  "ATP839",
  "ATQ719",
  "ATQ821",
  "AUS715",
  "D1K765",
  "ASI869",
  "ASU748",
  "ASU862",
  "AVB843",
  "AVM877",
  "AVN709",
  "AVO818",
  "M2X793",
  "T4I868",
  "T7J860",
  "A0Z928",
  "C4J778",
  "T7J857",
  "T8V933",
  "A0Z931",
  "A6L928",
  "AMQ859",
  "M2X740",
  "P1Y906",
  "ABI836",
  "ANU794",
  "P1N910",
  "T6F857",
  "T6F864",
  "ALS828",
  "AMN912",
  "AVL781",
  "B5V805",
  "P1Y920",
  "P3O881",
  "T5G881",
  "ARN737",
  "B7C795",
  "M1R800",
  "AKG938",
  "AKI885",
  "ALI785",
  "AUR773",
  "AUR805",
  "AUS729",
  "B4X706",
  "B9W924",
  "C6K799",
  "C4J776",
  "ALY844",
  "ALY906",
  "AMA711",
  "AMB777",
  "D1I730",
  "D1K708",
  "D5M763",
  "M3Q849",
  "ARN836",
  "ARN917",
  "C4Z745",
  "C5S927",
  "F8Q888",
  "ANW896",
  "BFI922",
  "7814DP",
  "P3W876",
  "P3Z855",
  "P3O713",
  "P2Y780",
  "A3T845",
  "P2J236",
  "P3F912",
  "BNH735",
  "BNH712",
  "BNG892",
  "BNG862",
  "BNH795",
  "BNH865",
  "BNG758",
  "BNI736",
  "BNG928",
  "BNH869",
  "TBM926",
  "TBM898",
  "TBM815",
  "TBM893",
  "BPS757",
  "BPS816",
  "BPS848",
  "D0S862",
  "P3M862",
  "BPT919",
  "BPT788",
  "BSC865",
  "BSC900",
  "BSC917",
  "BSD716",
  "BSD900",
  "F2S948"
]