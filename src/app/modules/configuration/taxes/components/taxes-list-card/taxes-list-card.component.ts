import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Taxe } from '@interface/taxe';

@Component({
  selector: 'app-taxes-list-card',
  templateUrl: './taxes-list-card.component.html',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, DatePipe],
  styleUrls: ['./taxes-list-card.component.scss']
})
export class TaxesListCardComponent implements OnInit {

  @Input() item!: Taxe;
  @Output() submitForm : EventEmitter<Taxe> = new EventEmitter();

  public form : FormGroup = new FormGroup ({
    value : new FormControl('', Validators.required),
    description : new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
    this.form.patchValue(this.item)
    this.form.disable();
  }

  ngOnChanges(changes: SimpleChanges){
    this.form.patchValue(this.item)
    this.form.disable()

  }

  public cancelEdit(){
    this.form.patchValue(this.item)
    this.form.disable();
  }

  public _submitForm(){
    if(this.form.valid){
      this.submitForm.emit(this.form.value)
    }
  }
}
