import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-spinner-default',
  templateUrl: './spinner-default.component.html',
  styleUrls: ['./spinner-default.component.scss'],
  imports: [MatProgressSpinnerModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerDefaultComponent {}
