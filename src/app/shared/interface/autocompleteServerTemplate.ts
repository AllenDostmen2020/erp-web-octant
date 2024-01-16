import { ButtonAddAutocomplete } from "./autocompleteLocalTemplate";

export interface AutocompleteServerConfiguration<T = any> {
    textLabel: string;
    placeholder?: string;
    keySearch?: string;
    queryParams?: string;
    serverUrl: string;
    displayFn?: (item: T) => string;
    parseDataFn?: (data: T[]) => (T[] | Promise<T[]>); 
    keyDisplayTextOptions?: string | null;
    keyValue?: string | null;
    buttonAdd?: ButtonAddAutocomplete;
  }