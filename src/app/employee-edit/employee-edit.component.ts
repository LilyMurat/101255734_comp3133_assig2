import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private backendService: BackendService) { }

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId !== null) {
      this.backendService.getEmployee(employeeId).subscribe((employee: Employee) => {
        this.employee = employee;
      });
    }
  }

  onSubmit(employee: Employee) {
    this.backendService.updateEmployee(employee).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }
}
