import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'actions'];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.backendService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to deletethis employee?')) {
      this.backendService.deleteEmployee(id).subscribe(
        () => {
          // Remove the deleted employee from the list
          this.employees = this.employees.filter((employee) => employee.id !== id);
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }
}

