import { TypeValueKeyItem } from "@component/item-list-template/item-list-template.component";
import { FetchErrorResponse } from "./fetch";
import { EventEmitter, TemplateRef, WritableSignal } from "@angular/core";

export interface ItemDetailConfiguration<T = any> {
    title: string;

    subtitle?: ((item: T) => string | number | null | undefined) | false;

    itemId?: string;

    server: {
        url: string;
        queryParams?: { [key: string]: any };
    }

    loading?: boolean;

    groups: ItemDetailGroup<T>[];

    dataItem?: WritableSignal<T | null>;

    parseItemFn?: (item: T) => (T | Promise<T>);
    afterSetItemFn?: (item: T) => void;
    afterDeleteItemFn?: (item: T) => void;
    afterRestoreItemFn?: (item: T) => void;

    editButton?: {
        text?: string;
        routerLink?: RouterLinkItem<T>
    } | false;

    deleteButton?: boolean;
    restoreButton?: boolean;
    backButton?: boolean;

    actionButtons?: ActionButton<T, ActionButtonType>[];

    ignoreShowError?: boolean;
    interceptHttpErrorItemFn?: (error: FetchErrorResponse) => void;
    httpError?: FetchErrorResponse;

    hiddeHeader?: boolean;

    updateItemEvent?: EventEmitter<boolean>;
}

export interface ItemDetailGroup<T> {
    icon?: string,
    title?: string,
    details: ItemDetail<T>[]
    template?: {
        ref: TemplateRef<any>,
        position?: 'before' | 'after',
    },
    actions?: ActionButton<T>[]
}

export interface ItemDetail<T> {
    clickEvent?: (item: T) => void;
    cssClass?: ((item: T) => string) | string;
    dateFormat?: string;
    displayValueFn: (item: T) => string | number | null | undefined | string[];
    key?: string;
    title: string;
    numberFormat?: string;
    routerLink?: RouterLinkItem<T>
    tooltip?: ((item: T) => string) | string;
    type?: TypeValueKeyItem | 'image' | 'image-server' | 'private-image-server' | 'html';
}

export interface ActionButton<T, Type = 'clickEvent'> {
    type?: Type;
    style: StyleButton;
    icon?: string;
    text?: string;
    title?: string;
    clickEvent: (item: T) => void;
}

export type StyleButton = 'filled-button' | 'tonal-button' | 'text-button' | 'outlined-button' | 'elevated-button' | 'icon-button' | 'tonal-icon-button' | 'filled-icon-button' | 'outlined-icon-button';

export type ActionButtonType = 'clickEvent' | 'update' | 'delete' | 'restore';

export interface RouterLinkItem<T> {
    url: ((item: T) => string) | string;
    outlet?: 'route-lateral' | 'principal';
    queryParams?: { [key: string]: any },
    state?: ((item: T) => (string | {[key: string]: any} | any[] | number | null)) | string | {[key: string]: any} | any[] | number | null;
}
