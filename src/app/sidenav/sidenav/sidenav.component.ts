import { Component, ElementRef, HostListener, Renderer2, Signal, ViewChild, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '@service/auth.service';
import { User, UserRoleEnum } from '@interface/user';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PathFilesServerPipe } from '@pipe/path-files-server.pipe';
import { FirstLetterNamePipe } from '@pipe/first-letter-name.pipe';
import { MatSelectModule } from '@angular/material/select';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { AppsMenuComponent } from '../apps-menu/apps-menu.component';
import { SettingsMenuComponent } from '../settings-menu/settings-menu.component';
import { NotificationsMenuComponent } from '../notifications-menu/notifications-menu.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '@service/events.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DatabaseStorageService, NameModuleDatabase } from '@service/database-storage.service';

interface GroupDrawerLink {
  label?: string;
  links: DrawerLink[];
  roles?: UserRoleEnum[];
}

interface DrawerLink {
  label: string;
  icon: string;
  route: string;
  exact?: boolean;
  queryParams?: { [key: string]: string | number | boolean };
  roles?: UserRoleEnum[];
  group_open?: boolean;
}

export interface EventGlobalSearch {
  type: 'enter' | 'change';
  value: string;
}

export const NAME_EVENT_GLOBAL_SEARCH = 'global_search';

export declare type LateralPanelType = 'maximum' | 'minimum';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,

    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,

    MatMenuModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,

    PathFilesServerPipe,
    FirstLetterNamePipe,

    ProfileMenuComponent,
    AppsMenuComponent,
    SettingsMenuComponent,
    NotificationsMenuComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent {
  private authService = inject(AuthService);
  private renderer2 = inject(Renderer2);
  private eventService = inject(EventsService);
  public location = inject(Location);
  public databaseStorageService = inject(DatabaseStorageService);

  public user: Signal<User | null> = this.authService.user;
  public sidenavDrawerMode: WritableSignal<'over' | 'push' | 'side'> = signal('side');
  public showDrawer: WritableSignal<boolean> = signal(false);
  public groupDrawerLinks: WritableSignal<GroupDrawerLink[]> = signal([]);

  public lateralPanelType: WritableSignal<LateralPanelType> = signal('maximum');
  public showLateralPanel: WritableSignal<boolean> = signal(false);

  @ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>;
  public searchCtrl: FormControl = new FormControl('');
  public optionsSearchCtrl: FormControl = new FormControl('');
  public speakingMicrophone: WritableSignal<boolean> = signal(false);

  @HostListener('window:keydown.esc', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if ((event.target as HTMLElement).nodeName.toUpperCase() !== 'INPUT' && this.showLateralPanel()) {
      this.location.back();
    }
  }

  ngOnInit(): void {
    this.getValidatedLinks(DRAWER_LINKS, this.user()!.role);
    this.watchSearchCtrl();
    this.loadConfigurations();
  }

  private async getValidatedLinks(links: GroupDrawerLink[], role: UserRoleEnum): Promise<void> {
    const linksFiltered: GroupDrawerLink[] = [];
    for await (const link of links) {
      if (link.roles && !link.roles.includes(role)) continue;
      if (link.links.length) link.links = await this.filteredLinks(link.links, role);
      linksFiltered.push(link);
    }
    this.groupDrawerLinks.set(linksFiltered);
  }

  public async filteredLinks(links: DrawerLink[], role: UserRoleEnum): Promise<DrawerLink[]> {
    const parseLinks = [];
    for await (const link of links) {
      if (link.roles && !link.roles.includes(role)) continue;
      parseLinks.push(link);
    }
    return parseLinks;
  }

  public setShowLateralPanel(status: boolean, data: any = null) {
    this.showLateralPanel.set(status);
    if (status) {
      if ((data.lateralPanelType ?? null) == 'minimum') {
        this.lateralPanelType.set('minimum');
      } else {
        this.lateralPanelType.set('maximum');
      }
    }
  }

  private getAccessMicrophone(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  public async requestAccessMicrophone(): Promise<void> {
    if (this.speakingMicrophone()) return;

    const permission = await this.getAccessMicrophone();

    if (permission) {

      if (!('webkitSpeechRecognition' in window)) return;

      const recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
      recognition.lang = 'es-ES';

      this.speakingMicrophone.set(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.searchCtrl.setValue(transcript || this.searchCtrl.value);
        this.speakingMicrophone.set(false);
        this.renderer2.selectRootElement(this.inputSearch.nativeElement).focus();
      };

      recognition.onend = () => {
        this.speakingMicrophone.set(false);
        this.renderer2.selectRootElement(this.inputSearch.nativeElement).focus();
      }

      recognition.start();
    } else {
      this.speakingMicrophone.set(false);
    }
  }

  private watchSearchCtrl(): void {
    this.searchCtrl.valueChanges.subscribe((value) => {
      this.eventService.emitEvent<EventGlobalSearch>(NAME_EVENT_GLOBAL_SEARCH, { type: 'change', value });
    });
  }

  public enterSearch(): void {
    this.eventService.emitEvent<EventGlobalSearch>(NAME_EVENT_GLOBAL_SEARCH, { type: 'enter', value: this.searchCtrl.value });
  }

  private async loadConfigurations() {
    await Promise.allSettled([
      this.databaseStorageService.getData(NameModuleDatabase.Users),
      this.databaseStorageService.getData(NameModuleDatabase.Banks),
      // this.databaseStorageService.getData(NameModuleDatabase.Taxes),
      // this.databaseStorageService.getData(NameModuleDatabase.DocumentTypes),
      this.databaseStorageService.getData(NameModuleDatabase.Plans),
      this.databaseStorageService.getData(NameModuleDatabase.VehicleTypes),
    ])
  }

}


const DRAWER_LINKS: GroupDrawerLink[] = [
  {
    label: 'Organización',
    links: [
      {
        label: 'Clientes',
        icon: 'supervised_user_circle',
        route: '/organization/client',
      },
      {
        label: 'Clientes',
        icon: 'groups',
        route: '/client',
      },
      {
        label: 'Proveedores',
        icon: 'diversity_3',
        route: '/provider',
      }
    ]
  },
  {
    label: 'Opciones de la APP',
    links: [
      {
        label: 'Settings',
        route: '/settings',
        icon: 'settings',
      },
    ]
  },
];


// this.breakpointObserver
//       .observe([
//         '(min-width: 640px) and (max-width: 1024px)',
//         '(max-width: 640px)',
//       ])
//       .subscribe(({ breakpoints }) => {
//         if (breakpoints['(min-width: 640px) and (max-width: 1024px)']) {
//           this.mode = 'push';
//           this.backdrop = true;
//         } else if (breakpoints['(max-width: 640px)']) {
//           this.mode = 'over';
//           this.backdrop = true;
//         } else {
//           this.mode = 'side';
//           this.backdrop = false;
//         }
//       });



// links: Link[] = [
//   {
//       name: 'Inicio',
//       icon: 'home',
//       url: '/',
//       exact: true,
//   },
//   {
//       name: 'Stakeholders',
//       icon: 'handshake',
//       url: '/organization',
//       open: false,
//       childs: [
//           {
//               name: 'Leads',
//               icon: 'supervised_user_circle',
//               url: '/leads',
//           },
//           {
//               name: 'Clientes',
//               icon: 'groups',
//               url: '/client',
//           },
//           {
//               name: 'Proveedores',
//               icon: 'diversity_3',
//               url: '/provider',
//           },
//       ]
//   },
//   {
//       name: 'Colaboradores',
//       icon: 'lan',
//       url: '/organization',
//       open: false,
//       childs: [
//           {
//               name: 'Usuarios',
//               icon: 'person_add',
//               url: '/user',
//           },
//           {
//               name: 'Recursos humanos',
//               icon: 'admin_panel_settings',
//               url: '/human-resource',
//           },
//           // {
//           //     name: 'Vendedores',
//           //     icon: 'communication',
//           //     url: '/seller',
//           // },
//           // {
//           //     name: 'Jefes de proyectos',
//           //     icon: 'supervisor_account',
//           //     url: '/project-manager',
//           // },
//       ]
//   },
//   {
//       name: 'Cotizaciones',
//       icon: 'monetization_on',
//       url: '/quotation',
//       childs: [
//           {
//               name: 'Cotizaciones',
//               icon: 'monetization_on',
//               url: '/quotation/recents'
//           },
//           {
//               name: 'Costos unitarios',
//               icon: 'call_split',
//               url: '/quotation/unit-cost',
//           },
//           // {
//           //     name: 'Materiales',
//           //     icon: 'construction',
//           //     url: '/material',
//           // },
//           {
//               name: 'Mano de obra',
//               icon: 'handshake',
//               url: '/quotation/workforce',
//           },
//           {
//               name: 'Equipos y herramientas',
//               icon: 'inbox_customize',
//               url: '/quotation/equipment-tool',
//           },
//           {
//               name: 'Subcontratos',
//               icon: 'add_business',
//               url: '/quotation/subcontract',
//           },
//           {
//               name: 'Categorias de costos',
//               icon: 'gesture',
//               url: '/quotation/unit-cost-category',
//           }
//       ]
//   },
//   {
//       name: 'Productos',
//       icon: 'widgets',
//       url: '/product',
//       childs: [
//           {
//               name: 'Lista de productos',
//               icon: 'widgets',
//               url: '/product',
//           },
//           {
//               name: 'Categorias',
//               icon: 'category',
//               url: '/product/category',
//           },
//           {
//               name: 'Marcas',
//               icon: 'label_important',
//               url: '/product/brand',
//           },
//       ]
//   },
//   {
//       name: 'Configuraciones',
//       icon: 'settings',
//       url: '/configuration',
//       open: false,
//       childs: [
//           {
//               name: 'Tipos de documento',
//               url: '/configuration/document-type',
//               icon: 'dock',
//           },
//           {
//               name: 'Áreas de la empresa',
//               url: '/configuration/company-area',
//               icon: 'apartment',
//           },
//           {
//               name: 'Sector de stakeholders',
//               url: '/configuration/business-sector',
//               icon: 'corporate_fare',
//           },
//           {
//               name: 'Bancos',
//               url: '/configuration/bank',
//               icon: 'account_balance',
//           },
//           {
//               name: 'Cargos',
//               url: '/configuration/position',
//               icon: 'whatshot',
//           },
//           {
//               name: 'Unidad de medida',
//               url: '/configuration/measurement-unit',
//               icon: 'stacked_bar_chart',
//           },
//           {
//               name: 'Impuestos',
//               url: '/configuration/taxe',
//               icon: 'monitoring',
//           },
//           {
//               name: 'Cuentas bancarias',
//               url: '/configuration/account',
//               icon: 'payments',
//           },
//           {
//               name: 'Direcciones',
//               url: '/configuration/address',
//               icon: 'dns',
//           },
//           {
//               name: 'Tipo de trabajador',
//               url: '/configuration/worker-type',
//               icon: 'engineering',
//           },
//           {
//               name: 'Régimen laboral',
//               url: '/configuration/laboral-regimen',
//               icon: 'azm',
//           },
//           {
//               name: 'Tipo de contrato',
//               url: '/configuration/contract-type',
//               icon: 'badge',
//           },
//           {
//               name: 'Régimen de salud',
//               url: '/configuration/health-regimen',
//               icon: 'security',
//           },
//           {
//               name: 'Régimen pensionario',
//               url: '/configuration/pension-scheme',
//               icon: 'receipt',
//           },
//           {
//               name: 'Niveles de educación',
//               url: '/configuration/education-level',
//               icon: 'moving_ministry',
//           },
//       ]
//   },
//   {
//       name: 'Configuración de calendario',
//       icon: 'edit_calendar',
//       url: '/calendar-configuration',
//       open: false,
//       childs: [
//           {
//               name: 'Calendarios',
//               url: '/calendar/list',
//               icon: 'calendar_month',
//           },
//           {
//               name: 'Días feriados',
//               url: '/holiday',
//               icon: 'today',
//           },
//           {
//               name: 'Configuraciones',
//               icon: 'calendar_apps_script',
//               url: '/calendar-configuration/list',
//           },
//       ]
//   },
//   {
//       name: 'Control de cajas',
//       icon: 'point_of_sale',
//       url: '/box',
//       open: false,
//       childs: [
//           {
//               name: 'Caja',
//               url: '/box/list',
//               icon: 'flowsheet',
//           },
//           {
//               name: 'Movimientos de caja',
//               url: '/box/box-movement',
//               icon: 'right_click',
//           },
//       ]
//   },
//   {
//       name: 'Capital de trabajo',
//       icon: 'store',
//       url: '/working-capital-box',
//       open: false,
//       childs: [
//           {
//               name: 'Caja',
//               url: '/working-capital-box/list',
//               icon: 'flowsheet',
//           },
//       ]
//   },
//   {
//       name: 'Caja de rendición',
//       icon: 'point_of_sale',
//       url: '/surrender-box',
//       open: false,
//       childs: [
//           {
//               name: 'Caja de rendición',
//               url: '/surrender-box/list',
//               icon: 'flowsheet',
//           },
//       ]
//   },
//   {
//       name: 'Inversiones',
//       icon: 'connect_without_contact',
//       url: '/investor',
//       open: false,
//       childs: [
//           {
//               name: 'Inversionistas',
//               url: '/investor/list',
//               icon: 'recent_patient',
//           },
//           {
//               name: 'Inversiones',
//               url: '/investor/investment',
//               icon: 'insights',
//           },
//           {
//               name: 'Retiro de inversiones',
//               url: '/investor/investment-withdrawal',
//               icon: 'real_estate_agent',
//           },
//       ]
//   },
//   {
//       name: 'Socios',
//       icon: 'supervisor_account',
//       url: '/partner',
//       open: false,
//       childs: [
//           {
//               name: 'Lista de socios',
//               url: '/partner/list',
//               icon: 'supervised_user_circle',
//           },
//       ]
//   },
//   {
//       name: 'Requerimientos',
//       icon: 'view_timeline',
//       url: '/requirement',
//       open: false,
//       childs: [
//           {
//               name: 'Requerimientos',
//               url: '/requirement/list',
//               icon: 'last_page',
//           },
//       ]
//   },
//   {
//       name: 'Registro de actas',
//       icon: 'meeting_room',
//       url: '/record-meeting',
//       open: false,
//       childs: [
//           {
//               name: 'Registro de actas',
//               url: '/record-meeting/list',
//               icon: 'auto_videocam',
//           },
//       ]
//   },
//   {
//       name: 'Costos',
//       icon: 'price_check',
//       url: '/cost-center',
//       open: false,
//       childs: [
//           {
//               name: 'Centro de costos',
//               url: '/cost-center/panel',
//               icon: 'stacked_bar_chart',
//           },
//           {
//               name: 'Tipo de centro de costos',
//               url: '/cost-center/cost-center-type',
//               icon: 'arrow_and_edge',
//           },
//           {
//               name: 'Lista de gastos',
//               url: '/cost-center/expense-list-general',
//               icon: 'receipt_long',
//           },
//       ]
//   },
//   {
//       name: 'Proyectos',
//       icon: 'memory',
//       url: '/project',
//       open: false,
//       childs: [
//           {
//               name: 'Lista de proyectos',
//               url: '/project/list',
//               icon: 'electric_bolt',
//           },
//       ]
//   },
//   {
//       name: 'Compras',
//       icon: 'sell',
//       url: '/purchase-order',
//       open: false,
//       childs: [
//           {
//               name: 'Orden de compra',
//               url: '/purchase-order/list',
//               icon: 'file_open',
//           },
//       ]
//   },
//   {
//       name: 'Ajustes',
//       icon: 'build',
//       url: '/settings',
//       open: false,
//       childs: [
//           {
//               name: 'Perfil',
//               url: '/settings/profile',
//               icon: 'account_box',
//           },
//           {
//               name: 'Aplicación',
//               url: '/settings/application',
//               icon: 'settings_applications',
//           },
//       ]
//   },
//   {
//       name: 'Notificaciones',
//       icon: 'notifications',
//       url: '/settings/profile/notifications/list',
//       open: true,
//   },
// ];