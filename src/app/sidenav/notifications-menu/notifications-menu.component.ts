import { Component, ViewChild, ViewEncapsulation, WritableSignal, inject, signal } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { FetchService } from '@service/fetch.service';
import { Notification } from '@interface/notification';
import { PaginatorData } from '@interface/paginator';

@Component({
  selector: 'app-notifications-menu',
  standalone: true,
  imports: [
    NgFor,
    DatePipe,
    MatMenuModule,
    MatTabsModule,
  ],
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsMenuComponent {
  @ViewChild(MatMenuTrigger) private menuTrigger!: MatMenuTrigger;
  private fetch = inject(FetchService);
  public type: WritableSignal<'read'| 'unread'> = signal('unread');
  public notifications: WritableSignal<Notification[]> = signal([]);

  ngOnInit() {
    this.fetchNotifications();
  }
  
  private async fetchNotifications() {
    const notifications = await this.fetch.get<PaginatorData<Notification>>('auth/notification');
   this.notifications.set(notifications.data);

  }
}
