import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private _AuthService:AuthService, private router:Router){}

  isLoggedIn(): boolean {
  return this._AuthService.isLoggedIn();
}

isAdmin(): boolean {
  return this._AuthService.isAdmin();
}

logout() {
  this._AuthService.logout();
  this.router.navigate(['login']);
}
}
