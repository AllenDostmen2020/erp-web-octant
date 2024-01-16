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
    children?: PanelSidenavLink[];
}

export interface PanelSidenavLinkRouter {
    url: string;
    queryParams?: { [key: string]: any };
}