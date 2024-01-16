export interface PaginatorData<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[]
  next_page_url: null | number;
  path: string;
  per_page: number;
  prev_page_url: null | number;
  to: number;
  total: number;
}
