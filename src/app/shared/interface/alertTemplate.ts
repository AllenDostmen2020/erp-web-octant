export interface AlertConfiguration {
    title?: string;
    description: string;
    icon?: string;
    showCloseButton?: boolean;
    actionButton?: {
        icon?: string;
        text: string;
        fn: () => void
    };
}