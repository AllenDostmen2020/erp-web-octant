export interface Ubigeo {
  id?: number;
  name: string;
  ubigeo_father_id?: number|null;
  level?: 1 | 2 | 3;
  active?: boolean;

  ubigeos?: Ubigeo[];
  ubigeo_father?: Ubigeo;
}
