import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Box } from '@interface/box';

@Component({
  selector: 'app-box-opening-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDialogClose],
  templateUrl: './box-opening-create-page.component.html',
  styleUrl: './box-opening-create-page.component.scss'
})
export class BoxOpeningCreatePageComponent {
    public loading: boolean = false;

    public form: FormGroup = new FormGroup({
        amount_init: new FormControl(0),
    })

    constructor(
        @Inject(MAT_DIALOG_DATA) public data_dialog: Box,
        private dialogRef: MatDialogRef<BoxOpeningCreatePageComponent>
    ) { }

    get amountInitCtrl(): FormControl {
        return this.form.get('amount_init') as FormControl;
    }

    ngOnInit() {
        console.log(this.data_dialog);
        if (this.data_dialog.last_box_opening) {
            this.amountInitCtrl.setValue(this.data_dialog.amount);
            this.amountInitCtrl.disable()
        }
    }

    public save() {
        if (this.form.value) this.dialogRef.close({ ...this.form.getRawValue() });
    }

    public edit() {
        this.amountInitCtrl.enable()
    }

    public closeDialog() {
        this.dialogRef.close()
    }
}
