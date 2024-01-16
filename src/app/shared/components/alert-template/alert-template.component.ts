import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AlertConfiguration {
  title?: string;
  description: string;
  icon?: string;
  showCloseButton?: boolean;
  actionButton?: {
      icon?: string;
      text: string;
      fn: () => void
  };
}

@Component({
  selector: 'app-alert-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-template.component.html',
  styleUrls: ['./alert-template.component.scss']
})
export class AlertTemplateComponent {
  @Input({required: true}) configuration!: AlertConfiguration;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
}
