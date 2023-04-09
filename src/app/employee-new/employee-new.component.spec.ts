import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent implements OnInit {
  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(employee: Employee) {
    this.backendService.addEmployee(employee).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }
}
