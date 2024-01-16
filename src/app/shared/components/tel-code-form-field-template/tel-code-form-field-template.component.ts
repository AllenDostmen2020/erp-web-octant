import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { CodeCountry } from '@interface/codeCountry';

@Component({
    selector: 'app-tel-code-form-field-template',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, NgFor],
    templateUrl: './tel-code-form-field-template.component.html',
    styleUrls: ['./tel-code-form-field-template.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TelCodeFormFieldTemplateComponent {
    private databaseStorage = inject(DatabaseStorageService)

    @Input({ required: true }) codeCtrl!: FormControl;
    @Input({ required: true }) phoneCtrl!: FormControl;
    @Input() label: string = 'Teléfono';

    public codeCountries: CodeCountry[] = [];

    ngOnInit() {
        this.getCodeCountries();
    }

    private async getCodeCountries() {
        this.codeCountries = await this.databaseStorage.getData(NameModuleDatabase.CODE_COUNTRIES, 'server');
    }
}
