import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  employee: Employee | null = null;

  constructor(private route: ActivatedRoute, private backendService: BackendService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.backendService.getEmployee(id).subscribe((employee: Employee) => {
        this.employee = employee;
      });
    }
  }
}
