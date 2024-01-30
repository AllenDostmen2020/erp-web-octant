import { NgClass, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InputSelectConfiguration, InputSelectServerConfiguration, InputSelectTemplateComponent } from '@component/input-select-template/input-select-template.component';
import { Account } from '@interface/account';

@Component({
    selector: 'app-box-form-page',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        NgClass,
        MatInputModule,
        UpperCasePipe,
        InputSelectTemplateComponent
    ],
    templateUrl: './box-form-page.component.html',
    styleUrl: './box-form-page.component.scss'
})
export class BoxFormPageComponent {
    @Input() public form!: FormGroup;

    get typeCtrl(): FormControl {
        return this.form.get('type') as FormControl;
    }

    get accountIdCtrl(): FormControl {
        return this.form.get('account_id') as FormControl;
    }
    get coinCtrl(): FormControl {
        return this.form.get('coin') as FormControl;
    }

    public readonly typeSelectConfiguration: InputSelectConfiguration = {
        textLabel: 'Tipo',
        data: [
            { id: 'fisica', name: 'Fisica' },
            { id: 'virtual', name: 'Virtual' },
        ],
    }
    public readonly coinSelectConfiguration: InputSelectConfiguration = {
        textLabel: 'Moneda',
        data: [
            { id: 'soles', name: 'Soles' },
            { id: 'dólares', name: 'Dólares' },
        ],
    }
    public readonly accountSelectConfiguration: InputSelectServerConfiguration<Account> = {
        textLabel: 'Cuenta',
        placeholder: 'Seleccione una cuenta',
        displayTextFn: (item) => {
            return `${item.number} | ${item.bank?.name} | ${item.coin.toUpperCase()}`
        },
        server: {
            url: 'account',
            queryParams: 'relations=bank&active=1'
        }
    }
}
