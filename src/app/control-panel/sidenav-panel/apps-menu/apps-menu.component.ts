import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-apps-menu',
  standalone: true,
  imports: [
    MatMenuModule
  ],
  templateUrl: './apps-menu.component.html',
  styleUrls: ['./apps-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppsMenuComponent {

}
