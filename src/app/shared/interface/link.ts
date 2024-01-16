export interface Link {
  name: string;
  icon: string;
  url: string;
  exact?: boolean;
  queryParams?: any;
  role_user_enable?: string[];
  open?: boolean;
  childs?: Link[];
}
