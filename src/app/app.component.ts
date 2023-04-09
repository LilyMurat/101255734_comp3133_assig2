import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '101255734_comp3133_assig2';

  constructor(public authService: AuthService, private router: Router) {
    console.log({authService});
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
