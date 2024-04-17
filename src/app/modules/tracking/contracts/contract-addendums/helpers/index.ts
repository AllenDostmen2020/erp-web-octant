import { FormControl, FormGroup, Validators } from "@angular/forms";


export const contractAddendumFormGroup = () => new FormGroup({
    contract_id: new FormControl('', [Validators.required]),
    signature_date: new FormControl('', [Validators.required]),
    validity_date: new FormControl('', [Validators.required]),
    responsible_document_type: new FormControl('', [Validators.required]),
    responsible_document_number: new FormControl('', [Validators.required]),
    responsible_name: new FormControl('', [Validators.required]),
    responsible_paternal_name: new FormControl('', [Validators.required]),
    responsible_maternal_name: new FormControl('', [Validators.required]),
    client_responsible_phone: new FormControl('', [Validators.required]),
    client_responsible_email: new FormControl('', [Validators.required]),
    business_user_id: new FormControl('', [Validators.required]),
    previous_contract: new FormControl('', [Validators.required]),
    current_contract: new FormControl('', [Validators.required]),
    previous_recurring: new FormControl('', [Validators.required]),
    current_recurring: new FormControl('', [Validators.required]),
    previous_plan_number: new FormControl('', [Validators.required]),
    current_plan_number: new FormControl('', [Validators.required]),
    previous_vehicles_number: new FormControl('', [Validators.required]),
    current_vehicles_number: new FormControl('', [Validators.required]),
    vehicles_replace_number: new FormControl('', [Validators.required]),
    vehicles_replace_install_price: new FormControl('', [Validators.required]),
    penalty_applies: new FormControl('', [Validators.required]),
    penalty_description: new FormControl('', [Validators.required]),
});