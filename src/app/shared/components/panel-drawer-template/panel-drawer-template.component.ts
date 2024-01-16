import { Component, Input, ViewEncapsulation, WritableSignal, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { PanelSidenavConfiguration, PanelSidenavLink } from '@interface/secondaryPanelSidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-panel-drawer-template',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './panel-drawer-template.component.html',
  styleUrl: './panel-drawer-template.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PanelDrawerTemplateComponent {
  panelSidenavLinkSelected: WritableSignal<PanelSidenavLink | null> = signal(null);
  showChildren: WritableSignal<boolean> = signal(false);
  @Input({required: true}) public configuration!: PanelSidenavConfiguration;
  public selectedLink(link: PanelSidenavLink) {
    this.panelSidenavLinkSelected.set(link);
    this.showChildren.set(true);
  }
}
