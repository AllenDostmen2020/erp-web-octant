import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertConfiguration } from '@interface/alertTemplate';

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
