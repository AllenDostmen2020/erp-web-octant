import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { dateColumn, itemCreatedAtColumn, itemStatusColumn, itemUpdatedAtColumn, numberColumn, textColumn, uppercaseColumn } from "@component/item-list-template/item-list-template.component";
import { Contract, RecurrentTypeEnum } from "@interface/contract";

export const getContractFormGroup = (): FormGroup => {
    return new FormGroup({
        client_business_unit_id: new FormControl(null, [Validators.required]),

        client_id: new FormControl(null, [Validators.required]),
        client: new FormControl(null),

        installation_date: new FormControl(new Date(), [Validators.required]),
        start_date: new FormControl({ value: null, disabled: true }),
        end_date: new FormControl({ value: null, disabled: true }),
        period: new FormControl(null, [Validators.required]),

        recurrent_type: new FormControl(RecurrentTypeEnum.MENSUAL, [Validators.required]),

        client_responsible_document_number: new FormControl(null),
        client_responsible_document_type: new FormControl(null),
        client_responsible_name: new FormControl(null),
        client_responsible_paternal_name: new FormControl(null),
        client_responsible_maternal_name: new FormControl(null),
        client_responsible_phone: new FormControl(null),
        client_responsible_email: new FormControl(null),

        sale_user_id: new FormControl(null, [Validators.required]),
        
        contract_plans: new FormArray([
            getContractPlanFormGroup(),
        ]),
    })
}

export const getContractPlanFormGroup = (): FormGroup => new FormGroup({
    contract_id: new FormControl(null),
    plan_id: new FormControl(null, [Validators.required]),
    plan: new FormControl(null),
    quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    buy_price: new FormControl('0.00', [Validators.required, Validators.min(1)]),
    sale_price: new FormControl('0.00', [Validators.required, Validators.min(1)]),
    installation_price: new FormControl('0.00', [Validators.required, Validators.min(1)]),
    total_installation_price: new FormControl({ value: '0.00', disabled: true }),
    total: new FormControl({ value: '0.00', disabled: true }),
    contract_plan_vehicles: new FormArray([]),
})

export const getContractPlanVehicleFormGroup = (): FormGroup => new FormGroup({
    contract_plan_id: new FormControl(null),
    vehicle_id: new FormControl(null),
    vehicle: new FormGroup({
        vehicle_type_id: new FormControl(null, [Validators.required]),
        vehicle_type: new FormControl(null),
        plate: new FormControl(null, [Validators.required]),
        brand: new FormControl(null),
        model: new FormControl(null),
    }),
})

export const contractColumnsList = () => [
    textColumn<Contract>({
        title: 'Código',
        sort: { key: 'code' },
        displayValueFn: (item) => item.code,
        routerLinkValue: { url: (item) => `/tracking/contract/view/${item.id}` },
    }),
    uppercaseColumn<Contract>({
        title: 'Cliente/Unidad de negocio',
        displayValueFn: (item) => item.client?.name,
        displayAdditionalValueFn: (item) => item.client_business_unit?.name,
        gridColumn: '1fr',
        routerLinkValue: { url: (item) => `/organization/client/view/${item.client?.id}` },
    }),
    uppercaseColumn<Contract>({
        title: 'Recurrente',
        displayValueFn: (item) => item.recurrent_type,
    }),
    textColumn<Contract>({
        title: 'Periodo',
        displayValueFn: (item) => item.period,
    }),
    numberColumn<Contract>({
        title: 'N° planes',
        displayValueFn: (item) => item.plan_quantity,
        numberFormat: '2.0-0',
    }),
    numberColumn<Contract>({
        title: 'N° vehículos',
        displayValueFn: (item) => item.contract_plans?.reduce((previousValue, item) => previousValue + Number(item.quantity), 0),
        numberFormat: '2.0-0',
    }),
    dateColumn<Contract>({
        title: 'Fecha inicio',
        displayValueFn: (item) => item.start_date,
    }),
    dateColumn<Contract>({
        title: 'Fecha fin',
        displayValueFn: (item) => item.end_date,
    }),
    itemCreatedAtColumn(),
    itemUpdatedAtColumn(),
    itemStatusColumn(),
]
