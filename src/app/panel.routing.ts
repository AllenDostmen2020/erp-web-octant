import { Routes } from '@angular/router';
import { lateralPanelRouting } from './lateral-panel.routing';
import { userRoutes } from './home/users/users-routing.module';
import { productRoutes } from './home/products/products-routing.module';
import { categoryRoutes } from './home/categories/categories-routing.module';
import { brandRoutes } from './home/brands/brands-routing.module';
import { quotationRoutes } from './home/quotation/quotation.routing';
import { projectRoutes } from './home/projects/projects-routing.module';
import { octantRoutes } from './home/octant/octant.route';

export const panelRoutes: Routes =[
    {
        path: 'octant',
        children: octantRoutes,
        title: 'Octant | ERP'
    },
    {
        path: 'user',
        children: userRoutes,
        title: 'Usuarios | ERP'
    },
    {
        path: 'client',
        loadChildren: () => import('./home/clients/clients.module').then(m => m.ClientsModule),
        title: 'Clientes | ERP'
    },
    {
        path: 'lead',
        loadChildren: () => import('./home/clients/clients.module').then(m => m.ClientsModule),
        title: 'Leads | ERP'
    },
    {
        path: 'product',
        children: productRoutes,
        title: 'Productos | ERP'
    },
    {
        path: 'brand',
        children: brandRoutes,
        title: 'Marcas | ERP'
    },
    {
        path: 'category',
        children: categoryRoutes,
        title: 'Categorias | ERP'
    },
    {
        path: 'provider',
        loadChildren: () => import('./home/providers/providers.module').then(m => m.ProvidersModule),
        title: 'Proveedores | ERP'
    },
    {
        path: 'configuration',
        loadChildren: () => import('./home/configuration/configuration.module').then(m => m.ConfigurationModule),
        title: 'Configuraciones | ERP'
    },
    {
        path: 'quotation',
        children: quotationRoutes,
        title: 'Cotizaciones | ERP'
    },
    {
        path: 'box',
        loadChildren: () => import('./home/boxes/boxes.module').then(m => m.BoxesModule),
        title: 'Caja | ERP'
    },
    {
        path: 'investor',
        loadChildren: () => import('./home/investors/investors.module').then(m => m.InvestorsModule),
        title: 'Inversionistas | ERP'
    },
    {
        path: 'partner',
        loadChildren: () => import('./home/partners/partners.module').then(m => m.PartnersModule),
        title: 'Socios | ERP'
    },
    {
        path: 'working-capital-box',
        loadChildren: () => import('./home/working-capital-box/working-capital-box.module').then(m => m.WorkingCapitalBoxModule),
        title: 'Capital de trabajo | ERP'
    },
    {
        path: 'cost-center',
        loadChildren: () => import('./home/cost-center/cost-center.module').then(m => m.CostCenterModule),
        title: 'Centro de costos | ERP'
    },
    {
        path: 'project',
        children: projectRoutes,
        title: 'Proyectos | ERP'
    },
    {
        path: 'surrender-box',
        loadChildren: () => import('./home/surrender-box/surrender-box.module').then(m => m.SurrenderBoxModule),
        title: 'Caja de entrega | ERP'
    },
    {
        path: 'purchase-order',
        loadChildren: () => import('./home/purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
        title: 'Orden de compra | ERP'
    },
    {
        path: 'calendar',
        loadChildren: () => import('./home/calendar/calendar.module').then(m => m.CalendarModule),
        title: 'Calendario | ERP'
    },
    {
        path: 'settings',
        loadChildren: () => import('./home/settings/settings.module').then(m => m.SettingsModule),
        title: 'Ajustes | ERP'
    },
    {
        path: 'notifications',
        loadChildren: () => import('./home/notifications/notifications.module').then(m => m.NotificationsModule),
        title: 'Notificaciones | ERP'
    },
    {
        path: 'requirement',
        loadChildren: () => import('./home/requirement/requirement.module').then(m => m.RequirementModule),
        title: 'Requerimientos | ERP'
    },
    {
        path: 'record-meeting',
        loadChildren: () => import('./home/record-meeting/record-meeting.module').then(m => m.RecordMeetingModule),
        title: 'Registro de actas | ERP'
    },
    {
        path: 'calendar-configuration',
        loadChildren: () => import('./home/calendar-configuration/calendar-configuration.module').then(m => m.CalendarConfigurationModule),
        title: 'Calendarios | ERP'
    },
    {
        path: 'holiday',
        loadChildren: () => import('./home/configuration/holiday/holiday.module').then(m => m.HolidayModule),
        title: 'Feriados | ERP'
    },
    {
        path: 'human-resource',
        loadChildren: () => import('./home/human-resource/human-resource.module').then(m => m.HumanResourceModule),
        title: 'Recursos humanos | ERP'
    },
    {
        path: 'payment-order',
        loadChildren: () => import('./home/purchase-order/payment-order/payment-order.module').then(m => m.PaymentOrderModule),
    },
    {
        path: 'code-country',
        loadChildren: () => import('./home/code-country/code-country.module').then(m => m.CodeCountryModule),
    },

    /* --------------- */
    /* LATERAL ROUTING */
    /* --------------- */
    ...lateralPanelRouting,
    /* --------------- */
    /* --------------- */
    /* --------------- */

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
]
