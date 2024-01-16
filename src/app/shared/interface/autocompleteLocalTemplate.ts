import { NameModuleDatabase } from "@service/database-storage.service";

export interface AutocompleteLocalConfiguration<T = any> {
  textLabel: string;
  placeholder?: string;
  nameModuleDatabase: NameModuleDatabase;
  conditionFilterFn?: (search: string, item: T) => boolean;
  displayFn?: (item: T) => string;
  parseDataFn?: (data: T[]) => (T[] | Promise<T[]>);
  keyDisplayTextOptions?: string | null;
  keyValue?: string | null;
  initializeFilter?: boolean;
  buttonAdd?: ButtonAddAutocomplete;
}

export interface ButtonAddAutocomplete {
  label?: string;
  routerLink: string;
  function?: () => void;
  outlet: 'route-lateral' | 'principal';
}