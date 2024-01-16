import { IsActiveMatchOptions, Params } from "@angular/router";
import { FetchErrorResponse } from "./fetch";

export interface ItemViewConfiguration<T = any> {
    item?: T;
    nameItemFn?: (item: T) => string;
    titleModule: string;
    itemPathServer: string;
    itemId?: string;
    queryParams?: string;
    links: LinkNavProfile[];
    loading?: boolean;
    parseItemFn?: (item: T) => (T | Promise<T>);
    afterSetItemFn?: (item: T) => void;
    interceptHttpErrorItemFn?: (error: FetchErrorResponse) => void;
    httpError?: FetchErrorResponse;
}

export interface LinkNavProfile {
    text: string;
    routerLink: string;
    routerLinkActiveOptions?: { exact: boolean } | IsActiveMatchOptions;
    queryParams?: Params | null;
    icon?: string;
    disabled?: boolean;
}