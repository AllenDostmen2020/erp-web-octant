import { FormGroup } from "@angular/forms";
import { FetchErrorResponse } from "./fetch";
import { WritableSignal } from "@angular/core";
import { InputAutocompleteConfiguration, InputAutocompleteLocalConfiguration, InputAutocompleteServerConfiguration } from "@component/input-autocomplete-template/input-autocomplete-template.component";
import { InputSelectConfiguration, InputSelectLocalConfiguration, InputSelectServerConfiguration } from "@component/input-select-template/input-select-template.component";

export interface ItemFormConfiguration<Item = any, Data = any> {
    title?: string;
    titleModule: string;

    subtitle?: ((item: Item) => string | number | null | undefined) | false;

    formGroup: FormGroup;
    type: 'create' | 'update';
    pathServer: string;
    loading?: boolean;
    hiddeFields?: boolean;
    fields?: FormInput[];

    item?: Item;
    dataItem?: WritableSignal<Item | null>,

    customUpdatePathServer?: string;

    parseDataItemBeforeSendFormFn?: (data: Data) => (Data | Promise<Data>);
    afterSaveFormFn?: (data: Item) => void;

    itemPathServer?: string;
    itemQueryParamsString?: string;
    itemId?: string | number
    parseItemBeforePatchFormFn?: (item: Item) => (Item | Promise<Item>);

    ignoreShowError?: boolean;
    interceptHttpErrorItemFn?: (error: FetchErrorResponse) => void;
    httpError?: FetchErrorResponse;

    disableAutoBackLocation?: boolean;

    saveButton?: {
        text: string;
        icon?: string;
        iconPosition?: 'left' | 'right';
    };
    
    cancelButton?: {
        iconPosition?: 'left' | 'right';
        text: string;
        icon?: string;
    } | false;
}

export declare type InputType = 'select' | 'select-local' | 'select-server' | 'date' | 'date-range' | 'text' | 'number' | 'textarea' | 'checkbox' | 'switch' | 'autocomplete' | 'autocomplete-local' | 'autocomplete-server';

export interface FormInput {

    type: InputType | 'file';

    text?: TextFormInput;

    number?: NumberFormInput;

    textarea?: TextareaFormInput;
    
    date?: DateFormInput;
    
    dateRange?: DateRangeFormInput;
    
    switch?: SwitchFormInput;
    
    checkbox?: CheckboxFormInput;

    select?: SelectConfigurationExt;

    selectLocal?: SelectLocalConfigurationExt;
    
    selectServer?: SelectServerConfigurationExt;

    autocomplete?: AutocompleteConfigurationExt;

    autocompleteServer?: AutocompleteServerConfigurationExt;

    autocompleteLocal?: AutocompleteLocalConfigurationExt;
}

export interface TextFormInput<T = any> {
    formControlName: string;
    textLabel: string;
    placeholder?: string;
    defaultValue?: string | number | null;
    minLength?: number;
    maxLength?: number;
    cssClass?: string | ((item: T) => string);
}

export interface NumberFormInput<T = any> {
    formControlName: string;
    textLabel: string;
    placeholder?: string;
    defaultValue?: string | number | null;
    min?: number;
    max?: number;
    step?: number;
    cssClass?: string | ((item: T) => string);
}

export interface TextareaFormInput<T = any> {
    formControlName: string;
    textLabel: string;
    placeholder?: string;
    defaultValue?: string | number | null;
    minLength?: number;
    maxLength?: number;
    rows?: number;
    cssClass?: string | ((item: T) => string);
}

export interface SelectFormInput<T = any> {
    formControlName: string;
    textLabel: string;
    placeholder?: string;
    defaultValue?: string | number | boolean | null;
    options: { text: string, value: any }[];
    cssClass?: string | ((item: T) => string);
}

export interface DateFormInput<T = any> {
    formControlName: string;
    textLabel: string;
    placeholder?: string;
    defaultValue?: Date | string | number | null;
    min?: Date;
    max?: Date;
    cssClass?: string | ((item: T) => string);
}

export interface DateRangeFormInput<T = any> {
    formControlNameFrom: string;
    formControlNameTo: string;
    textLabel: string;
    placeholder?: string;
    defaultValueFrom?: Date | string | number | null;
    defaultValueTo?: Date | string | number | null;
    min?: Date;
    max?: Date;
    cssClass?: string | ((item: T) => string);
}

export interface SwitchFormInput<T = any> {
    formControlName: string;
    textLabel: string;
    defaultValue?: boolean | null;
    cssClass?: string | ((item: T) => string);
}

export interface CheckboxFormInput<T = any> {
    formControlName: string;
    textLabel: string;
    defaultValue?: boolean | null;
    cssClass?: string | ((item: T) => string);
}

interface SelectConfigurationExt<T = any> extends InputSelectConfiguration<T> {
    formControlName: string;
    defaultValue?: string | number | null;
    cssClass?: string | ((item: T) => string);
}

interface SelectLocalConfigurationExt<T = any> extends InputSelectLocalConfiguration<T> {
    formControlName: string;
    defaultValue?: string | number | null;
    cssClass?: string | ((item: T) => string);
}

interface SelectServerConfigurationExt<T = any> extends InputSelectServerConfiguration<T> {
    formControlName: string;
    defaultValue?: string | number | null;
    cssClass?: string | ((item: T) => string);
}

interface AutocompleteConfigurationExt<T = any> extends InputAutocompleteConfiguration<T> {
    formControlName: string;
    defaultValue?: string | number | null;
    cssClass?: string | ((item: T) => string);
}

interface AutocompleteLocalConfigurationExt<T = any> extends InputAutocompleteLocalConfiguration<T> {
    formControlName: string;
    defaultValue?: string | number | null;
    cssClass?: string | ((item: T) => string);
}

interface AutocompleteServerConfigurationExt<T = any> extends InputAutocompleteServerConfiguration<T> {
    formControlName: string;
    defaultValue?: string | number | null;
    cssClass?: string | ((item: T) => string);
}

export const textFormInput = (configuration: TextFormInput): FormInput => ({
    type: 'text',
    text: configuration
});

export const numberFormInput = (configuration: NumberFormInput): FormInput => ({
    type: 'number',
    number: configuration
});

export const textareaFormInput = (configuration: TextareaFormInput): FormInput => ({
    type: 'textarea',
    textarea: configuration
});

export const selectFormInput = (configuration: SelectConfigurationExt): FormInput => ({
    type: 'select',
    select: configuration
});

export const selectLocalFormInput = (configuration: SelectLocalConfigurationExt): FormInput => ({
    type: 'select',
    select: configuration
});

export const selectServerFormInput = (configuration: SelectServerConfigurationExt): FormInput => ({
    type: 'select',
    select: configuration
});

export const dateFormInput = (configuration: DateFormInput): FormInput => ({
    type: 'date',
    date: configuration
});

export const dateRangeFormInput = (configuration: DateRangeFormInput): FormInput => ({
    type: 'date-range',
    dateRange: configuration
});

export const switchFormInput = (configuration: SwitchFormInput): FormInput => ({
    type: 'switch',
    switch: configuration
});

export const checkboxFormInput = (configuration: CheckboxFormInput): FormInput => ({
    type: 'checkbox',
    checkbox: configuration
});

export const autocompleteFormInput = (configuration: AutocompleteConfigurationExt): FormInput => ({
    type: 'autocomplete-local',
    autocomplete: configuration
});

export const autocompleteLocalFormInput = (configuration: AutocompleteLocalConfigurationExt): FormInput => ({
    type: 'autocomplete-local',
    autocompleteLocal: configuration
});

export const autocompleteServerFormInput = (configuration: AutocompleteServerConfigurationExt): FormInput => ({
    type: 'autocomplete-server',
    autocompleteServer: configuration
});

