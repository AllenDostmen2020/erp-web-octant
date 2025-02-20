import { Component, Input, ViewEncapsulation, WritableSignal, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

export interface PanelSidenavConfiguration {
  title?: string;
  groups: PanelSidenavGroup[];
}

export interface PanelSidenavGroup {
  title?: string;
  icon?: string;
  links: PanelSidenavLink[];
}

export interface PanelSidenavLink {
  title: string;
  icon?: string;
  routerLink: PanelSidenavLinkRouter;
  children?: Omit<PanelSidenavLink, 'children'>[];
}

export interface PanelSidenavLinkRouter {
  url: string;
  queryParams?: { [key: string]: any };
}

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
