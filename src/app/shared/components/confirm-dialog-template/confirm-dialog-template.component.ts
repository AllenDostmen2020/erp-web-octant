import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogData } from '@interface/confirmDialog';

@Component({
  selector: 'app-confirm-dialog-template',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog-template.component.html',
  styleUrls: ['./confirm-dialog-template.component.scss']
})
export class ConfirmDialogTemplateComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
} 
