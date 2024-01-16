import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseModel } from "./baseModel";
import { ContractType } from "./contractType";
import { HealthRegimen } from "./healthRegimen";
import { LaboralRegimen } from "./laboralRegimen";
import { PensionScheme } from "./pensionScheme";
import { User } from "./user";
import { WorkerType } from "./workerType";
import { CompanyArea } from "./companyArea";
import { Position } from "./positions";

export interface HumanResource extends BaseModel {
    user_id: number;
    worker_type_id: number;
    laboral_regimen_id: number;
    contract_type_id: number;
    health_regimen_id: number;
    pension_scheme_id: number;
    company_area_id: number;
    position_id: number;

    educations: any[];
    name: string;
    paternal_last_name: string;
    maternal_last_name: string;
    nationality: string;
    sex: SexEnum;
    payment_type: HumanResourcePaymentTypeEnum;
    payment_frequency: HumanResourcePaymentFrequencyEnum;
    basic_pay_amount: number;
    health_regimen_code: string;
    health_regimen_start_date: string;
    health_regimen_end_date: string;
    contract_start_date: string;
    contract_end_date: string;
    pension_scheme_code: string,
    pension_scheme_start_date: string,
    pension_scheme_end_date: string,
    birthday_date: string,
    civil_status: string,
    number_children: number,
    cv_file: string,

    user?: User;
    worker_type?: WorkerType;
    laboral_regimen?: LaboralRegimen;
    contract_type?: ContractType;
    health_regimen?: HealthRegimen;
    pension_scheme?: PensionScheme;
    company_area?: CompanyArea;
    position?: Position;
}

export class HumanResourceClass {
    public generateFormGeneralData() {
        return new FormGroup({
            position: new FormControl(''),
            position_id: new FormControl('', [Validators.required]),
            company_area_id: new FormControl('', [Validators.required]),
            company_area: new FormControl(''),
            name: new FormControl('', [Validators.required]),
            paternal_last_name: new FormControl('', [Validators.required]),
            maternal_last_name: new FormControl('', [Validators.required]),
            nationality: new FormControl('', [Validators.required]),
            sex: new FormControl('', [Validators.required]),
            civil_status: new FormControl('', [Validators.required]),
            number_children: new FormControl('', [Validators.required]),
            birthday_date: new FormControl('', [Validators.required]),

            educations: new FormControl(''),                //FALTA

            user: new FormGroup({
                document_type_id: new FormControl(null, [Validators.required]),
                document_number: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,8}')]),
                address: new FormControl('', [Validators.required]),
                phone: new FormControl(''),
                phone_code: new FormControl('+51'),
                cellphone: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required]),
            })
        })
    }
}

export enum SexEnum {
    HOMBRE = 'hombre',
    MUJER = 'mujer',
    OTRO = 'otro',
}

export enum HumanResourcePaymentTypeEnum {
    DEPOSITO_EN_CUENTA = 'depósito en cuenta',
    EFECTIVO = 'efectivo',
    OTROS = 'otros',
}
export enum HumanResourcePaymentFrequencyEnum {
    DIARIO = 'diario',
    SEMANAL = 'semanal',
    QUINCENAL = 'quincenal',
    MENSUAL = 'mensual',
}
