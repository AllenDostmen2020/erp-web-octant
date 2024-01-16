import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SurrenderBoxOpening } from '@interface/surrenderBoxOpening';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { GetUserByIdPipe } from '@pipe/get-user-by-id.pipe';

@Component({
    selector: 'app-autocomplete-surrender-box-opening',
    standalone: true,
    templateUrl: './autocomplete-surrender-box-opening.component.html',
    styleUrls: ['./autocomplete-surrender-box-opening.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, GetUserByIdPipe]
})
export class AutocompleteSurrenderBoxOpeningComponent {
    @Input() control!: FormControl | AbstractControl;
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @ViewChild('inputHtml', { static: true })
    inputHtml!: ElementRef<HTMLInputElement>;

    public autocompleteCtrl: FormControl = new FormControl();
    public surrender_box_openings: SurrenderBoxOpening[] = [];

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
            const users = await this.databaseStorage.getData<SurrenderBoxOpening>(NameModuleDatabase.SURRENDER_BOX_OPENINGS);
            let user = users.find((u) => u.id == value);
            if (!user) {
                const users = await this.databaseStorage.getData<SurrenderBoxOpening>(NameModuleDatabase.SURRENDER_BOX_OPENINGS, 'server');
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
        this.surrender_box_openings = (
            await this.databaseStorage.getData<SurrenderBoxOpening>(NameModuleDatabase.SURRENDER_BOX_OPENINGS)
        ).filter(
            (u) =>
                u.surrender_box?.name.toLowerCase()?.includes(search.toLowerCase())
        );
        this.loading = false;
    }
    public displayFn(surrender_box_opening: SurrenderBoxOpening): string {
        return surrender_box_opening ? `${surrender_box_opening?.surrender_box?.name} | ${surrender_box_opening?.surrender_box?.type} | ${surrender_box_opening?.surrender_box?.account?.coin ?? surrender_box_opening?.surrender_box?.coin} ` : '';
    }

    public clearInput() {
        this.autocompleteCtrl.setValue('', { emitEvent: false });
        this.renderer.removeAttribute(this.inputHtml.nativeElement, 'readonly');
    }
}
