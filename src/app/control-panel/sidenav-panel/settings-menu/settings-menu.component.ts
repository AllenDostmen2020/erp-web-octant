import { Component, ViewEncapsulation, WritableSignal, signal } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
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
