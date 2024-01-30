import { Component, Input, ViewChild, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { User } from '@interface/user';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { FirstLetterNamePipe } from '@pipe/first-letter-name.pipe';
import { AuthService } from '@service/auth.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NameLevelUserPipe } from '@pipe/name-level-user.pipe';
import { FirstLetterUppercasePipe } from '@pipe/first-letter-uppercase.pipe';

interface Configurations {
  theme: 'light' | 'dark';
  color: string;
}

const THEME_COLORS = [
  // 'theme-color-yellow',
  // 'theme-color-red',
  'theme-color-orange',
  'theme-color-blue',
  'theme-color-green',
  'theme-color-purple',
  'theme-color-cyan',
  'theme-color-pink',
]

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [
    NgClass,
    MatMenuModule,
    MatSlideToggleModule,
    PathFilesServerPipe,
    FirstLetterNamePipe,
    NameLevelUserPipe,
    FirstLetterUppercasePipe,
  ],
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileMenuComponent {
  @ViewChild(MatMenuTrigger) private menuTrigger!: MatMenuTrigger;
  @Input({ required: true }) public user!: User;
  
  private authService = inject(AuthService);
  public configuration: WritableSignal<Configurations> = signal<Configurations>({
    color: 'theme-color-blue',
    theme: 'light'
  });
  public themeColors = THEME_COLORS;

  constructor() {
    this.getConfigurations();
  }

  public getConfigurations(): void {
    const configuration = localStorage.getItem('configuration');
    if (configuration) {
      const parsedConfiguration = JSON.parse(configuration);
      const theme = parsedConfiguration.theme == 'light' ? 'light' : 'dark';
      const color = this.themeColors.includes(parsedConfiguration.color) ? parsedConfiguration.color : 'theme-color-blue';
      this.setTheme(theme);
      this.setColor(color);
    } else {
      const {theme, color} = this.configuration();
      this.setTheme(theme);
      this.setColor(color);
    }
  }

  public setTheme(theme: 'light' | 'dark'): void {
    this.configuration.update((config: Configurations) => ({...config, theme}));
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('configuration', JSON.stringify(this.configuration()))
  }

  public setColor(color: string): void {
    this.configuration.update((config: Configurations) => ({...config, color}));
    document.documentElement.classList.remove(...this.themeColors);
    document.documentElement.classList.add(color);
    localStorage.setItem('configuration', JSON.stringify(this.configuration()))
  }

  public closeMenu(): void {
    this.menuTrigger.closeMenu();
  }

  public logout(): void {
    this.authService.logout();
  }
}
