import { FormControl, FormGroup, Validators } from "@angular/forms";

export const clientFormGroup = () => new FormGroup({
    document_type: new FormControl(null, [Validators.required]),
    document_number: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    phone: new FormControl(''),
    code_phone: new FormControl(''),
    cellphone: new FormControl(''),
    code_cellphone: new FormControl(''),
});
