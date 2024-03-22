import { NgFor } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CodeCountry } from '@interface/codeCountry';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';

@Component({
  selector: 'app-tel-code-form-field-template',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, NgFor],
  templateUrl: './tel-code-form-field-template.component.html',
  styleUrl: './tel-code-form-field-template.component.scss'
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
        this.codeCountries = await this.databaseStorage.getData(NameModuleDatabase.CodeCountries);
    }
}
