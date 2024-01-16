import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BoxOpening } from '@interface/boxOpening';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';

@Component({
    selector: 'app-autocomplete-box-opening',
    templateUrl: './autocomplete-box-opening.component.html',
    styleUrls: ['./autocomplete-box-opening.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule
    ]
})
export class AutocompleteBoxOpeningComponent {
    @Input() control!: FormControl | AbstractControl;
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @ViewChild('inputHtml', { static: true })
    inputHtml!: ElementRef<HTMLInputElement>;

    public autocompleteCtrl: FormControl = new FormControl();
    public box_openings: BoxOpening[] = [];

    public loading: boolean = false;

    constructor(
        private databaseStorage: DatabaseStorageService,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this.initValue();
        this.control.valueChanges.subscribe(() => {
            this.initValue();
        });
        this.autocompleteCtrl.valueChanges.subscribe((value) => {
            if (value instanceof Object) {
                this.control.setValue(value.id, { emitEvent: false });
                this.renderer.setAttribute(
                    this.inputHtml.nativeElement,
                    'readonly',
                    'readonly'
                );
            } else {
                this.control.setValue(null, { emitEvent: false });
                this.filteredUsers(value ?? '');
            }
        })
    }

    async initValue() {
        const value = this.control.value;
        if (value) {
            const users = await this.databaseStorage.getData<BoxOpening>(NameModuleDatabase.BOX_OPENINGS);
            let user = users.find((u) => u.id == value);
            if (!user) {
                const users = await this.databaseStorage.getData<BoxOpening>(NameModuleDatabase.BOX_OPENINGS, 'server');
                user = users.find((u) => u.id == value);
            }
            if (user) {
                this.autocompleteCtrl.setValue(user, { emitEvent: false });
                this.renderer.setAttribute(
                    this.inputHtml.nativeElement,
                    'readonly',
                    'readonly'
                );
            }
        }
        if (this.control.disabled) {
            this.autocompleteCtrl.disable({ emitEvent: false });
        } else {
            this.autocompleteCtrl.enable({ emitEvent: false });
        }
    }

    private async filteredUsers(search: string): Promise<void> {
        this.loading = true;
        this.box_openings = (
            await this.databaseStorage.getData<BoxOpening>(NameModuleDatabase.BOX_OPENINGS)
        ).filter(
            (u) =>
                u.box?.name.toLowerCase()?.includes(search.toLowerCase())
        );
        this.loading = false;
    }
    public displayFn(box_opening: BoxOpening): string {
        return box_opening ? `${box_opening?.box?.name} | ${box_opening?.box?.type} | ${box_opening?.box?.account?.coin ?? box_opening?.box?.coin} ` : '';
    }

    public clearInput() {
        this.autocompleteCtrl.setValue('', { emitEvent: false });
        this.renderer.removeAttribute(this.inputHtml.nativeElement, 'readonly');
    }
}
