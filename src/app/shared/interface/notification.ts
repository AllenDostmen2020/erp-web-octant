export interface Notification {
    id: string;
    notifiable_type: string;
    notifiable_id: string;
    read_at: string;
    created_at: string;
    data: {
        user_id: number;
        model: string;
        model_id: string;
        redirect_url: string;
        message: string;
    }
}
