import { NgTemplateOutlet } from '@angular/common';
import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  description: string;
  icon?: string;
  templateRef?: TemplateRef<any>;
  data?: any;
  cancelButton?: false | {
    text?: string;
    cssClass?: string;
    disabled?: boolean;
  },
  confirmButton?: {
    text?: string;
    cssClass?: string;
    disabled?: boolean;
  }
}

@Component({
  selector: 'app-confirm-dialog-template',
  standalone: true,
  imports: [MatDialogModule, NgTemplateOutlet],
  templateUrl: './confirm-dialog-template.component.html',
  styleUrls: ['./confirm-dialog-template.component.scss']
})
export class ConfirmDialogTemplateComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}
}