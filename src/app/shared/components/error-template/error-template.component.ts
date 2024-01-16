import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchErrorResponse, HTTP_ERROR_CODES } from 'src/app/shared/interfaces/fetch';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-template',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './error-template.component.html',
  styleUrls: ['./error-template.component.css']
})
export class ErrorTemplateComponent {
  @Input() error?: FetchErrorResponse;
  @Output() reload: EventEmitter<void> = new EventEmitter<void>();
  public errorInfo?: any;

  ngOnInit() {
    if(this.error) {
      const errorHttp = HTTP_ERROR_CODES.find((httpError) => httpError.status == this.error?.status);
      this.errorInfo = errorHttp ?? {
        status: 0,
        title: 'Error desconocido',
        description: 'Error desconocido',
      };
    }
  }
}
