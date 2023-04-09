import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeNewComponent } from './employee-new/employee-new.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employees/add', component: EmployeeNewComponent, canActivate: [AuthGuard] },
  { path: 'employees/info/:id', component: EmployeeInfoComponent, canActivate: [AuthGuard] },
  { path: 'employees/edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
