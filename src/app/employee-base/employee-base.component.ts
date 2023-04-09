import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../models/employee.model';


@Component({
  selector: 'app-employee-base',
  templateUrl: './employee-base.component.html',
  styleUrls: ['./employee-base.component.css']
})
export class EmployeeBaseComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Output() formSubmit: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() formCancel: EventEmitter<void> = new EventEmitter<void>();
  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }



  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: Employee = {
        ...this.employee,
        ...this.employeeForm.value,
      };
      this.formSubmit.emit(employeeData);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }
}
