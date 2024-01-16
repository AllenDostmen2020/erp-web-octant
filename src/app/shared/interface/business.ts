import { User } from "./user";

export interface Business {
  id: number;
  ruc: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  representative_document_number?: string;
  representative_name?: string;
  representative_position?: string;
  active?: string;
  user: User
}
