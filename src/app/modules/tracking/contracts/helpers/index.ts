import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RecurrentTypeEnum } from "@interface/contract";

export const getContractFormGroup = (): FormGroup => {
    return new FormGroup({
        client_business_unit_id: new FormControl(null, [Validators.required]),
  
        client_id: new FormControl(null, [Validators.required]),
        client: new FormControl(null),
        
        plan_id: new FormControl(null, [Validators.required]),
        plan: new FormControl(null),
        
        installation_date: new FormControl(new Date(), [Validators.required]),
        start_date: new FormControl({value: null, disabled: true}),
        end_date: new FormControl({value: null, disabled: true}),
        period: new FormControl(null, [Validators.required]),
        buy_price: new FormControl('0.00', [Validators.required]),
        sale_price: new FormControl('0.00', [Validators.required]),
        installation_price: new FormControl('0.00', [Validators.required]),
        total_installation_price: new FormControl(null),
        quantity: new FormControl(null, {validators: [Validators.required], updateOn: 'blur'}),
        proration_days: new FormControl({value: null, disabled: true}),
        recurrent_type: new FormControl(RecurrentTypeEnum.MENSUAL, [Validators.required]),
  
        client_responsible_document_number: new FormControl(null),
        client_responsible_document_type: new FormControl(null),
        client_responsible_name: new FormControl(null),
        client_responsible_phone: new FormControl(null),
        client_responsible_email: new FormControl(null),
        
        sale_user_id: new FormControl(null, [Validators.required]),
  
        contract_vehicles: new FormArray([]),
      })
}