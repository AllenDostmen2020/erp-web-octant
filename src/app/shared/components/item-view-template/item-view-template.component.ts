import { Component, Input, inject, ViewEncapsulation, ChangeDetectionStrategy, WritableSignal, signal } from '@angular/core';
import { Location, NgClass, NgFor, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, IsActiveMatchOptions, Params, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FetchService } from '@service/fetch.service';
import { FetchErrorResponse } from 'src/app/shared/interfaces/fetch';
import { objectToURLSearchParams } from '@utility/queryParams';
import { GetMixedValuePipe } from '@pipe/get-mixed-value.pipe';

export interface ItemViewConfiguration<T = any> {
    item?: WritableSignal<T|null>;
    nameItemFn?: (item: T) => string;
    titleModule: string;
    itemId?: string;
    links: LinkNavProfile[];
    loading?: boolean;
    parseItemFn?: (item: T) => (T | Promise<T>);
    afterSetItemFn?: (item: T) => void;
    interceptHttpErrorItemFn?: (error: FetchErrorResponse) => void;
    httpError?: FetchErrorResponse;
    server: {
        url: string;
        queryParams?: { [key: string]: any };
    }
}

export interface LinkNavProfile {
    text: string;
    routerLink: string;
    routerLinkActiveOptions?: { exact: boolean } | IsActiveMatchOptions;
    queryParams?: Params | null;
    icon?: string;
    disabled?: boolean;
}

@Component({
  selector: 'app-item-view-template',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatTabsModule,
    GetMixedValuePipe,
  ],
  templateUrl: './item-view-template.component.html',
  styleUrls: ['./item-view-template.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemViewTemplateComponent {
  @Input() public configuration!: ItemViewConfiguration;
  public location = inject(Location);
  public router = inject(Router);
  public activatedRoute = inject(ActivatedRoute);
  private fetch = inject(FetchService);
  private abortController = new AbortController();

  get links(): any {
    return this.configuration.links;
  }

  

  get itemId(): number | string {
    return this.configuration.itemId ?? this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  get titleModule(): string {
    return this.configuration.titleModule;
  }

  get nameItemFn(): (item: any) => string {
    return this.configuration.nameItemFn ?? ((item: any) => item?.name);
  }

  ngOnInit() {
    this.configuration.item ??= signal(null);
    this.activatedRoute.params.subscribe(() => this.getItem());
  }

  ngOnDestroy(): void {
    this.abortController.abort();
  }

  private async getItem<T>() {
    this.configuration.loading = true;
    try {
      const { server } = this.configuration;
      const queryParams = objectToURLSearchParams(server.queryParams ?? {});
      const url = `${server.url}/${this.itemId}?${queryParams ? queryParams : ''}`;
      const response = await this.fetch.get<T>(url, { signal: this.abortController.signal });
      const { parseItemFn } = this.configuration;
      const item = parseItemFn?.(response) ?? response;
      const { afterSetItemFn } = this.configuration;
      if (afterSetItemFn) afterSetItemFn(item);
      this.configuration.item!.set(item);
    } catch (error) {
      this.configuration.httpError = error as FetchErrorResponse;
      const { interceptHttpErrorItemFn } = this.configuration;
      if (interceptHttpErrorItemFn) interceptHttpErrorItemFn(this.configuration.httpError);
    }
    this.configuration.loading = false;
  }
}
