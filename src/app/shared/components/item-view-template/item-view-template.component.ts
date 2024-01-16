import { Component, Input, inject, ViewEncapsulation } from '@angular/core';
import { Location, NgClass, NgFor, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ItemViewConfiguration } from '@interface/itemView';
import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FetchService } from '@service/fetch.service';
import { FetchErrorResponse } from '@interface/fetch';
import { objectToURLSearchParams } from '@utility/queryParams';
import { GetMixedValuePipe } from '@pipe/get-mixed-value.pipe';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        style({
          position: 'relative',
        }),
      ],
      { optional: true }
    ),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [
          animate(
            '250ms ease-out',
            style({
              opacity: 0.25,
              transform: 'translateY(100px) scale(0.85)',
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter > *',
        [
          style({
            opacity: 0,
            // transform: 'translateX(60%)',
          }),
          animate(
            '250ms ease-out',
            style({
              opacity: 1,
              // transform: 'translateX(0%)',
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter > * > *',
        [
          style({
            opacity: 0,
            // transform: 'translateX(-60%)',
          }),
          animate(
            '250ms ease-out',
            style({
              opacity: 1,
              // transform: 'translateX(0%)',
            })
          ),
        ],
        { optional: true }
      ),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
]);

@Component({
  selector: 'app-item-view-template',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
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

  get item(): any {
    return this.configuration.item;
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
    this.activatedRoute.params.subscribe(() => this.getItem());
  }

  ngOnDestroy(): void {
    this.abortController.abort();
  }

  private async getItem<T>() {
    this.configuration.loading = true;
    try {
      const { itemPathServer } = this.configuration;
      let queryParams = this.configuration.queryParams ?? {};
        if (queryParams instanceof Object) {
            queryParams = objectToURLSearchParams(queryParams);
            queryParams = queryParams.toString();
        }
      const url = `${itemPathServer}/${this.itemId}?${queryParams ?? ''}`;
      const response = await this.fetch.get<T>(url, { signal: this.abortController.signal });
      const { parseItemFn } = this.configuration;
      this.configuration.item = parseItemFn?.(response) ?? response;
      const { afterSetItemFn } = this.configuration;
      if (afterSetItemFn) afterSetItemFn(this.configuration.item);
    } catch (error) {
      this.configuration.httpError = error as FetchErrorResponse;
      const { interceptHttpErrorItemFn } = this.configuration;
      if (interceptHttpErrorItemFn) interceptHttpErrorItemFn(this.configuration.httpError);
    }
    this.configuration.loading = false;
  }
}
