import { Component, ViewEncapsulation} from '@angular/core';
import { NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [
    NgClass,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsMenuComponent {

  

}
