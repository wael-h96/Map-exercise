import { Injectable } from '@angular/core';
import { LoginObject } from '../login/login.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: boolean = false;
  username: string = '';

  constructor(private router: Router) {}

  handleLogin(loginObj: LoginObject) {
    window.localStorage.setItem('user', JSON.stringify(loginObj));
    this.username = loginObj.username;
    this.currentUser = true;
    this.router.navigate(['/map']);
  }
  handleLogout() {
    window.localStorage.removeItem('user');
    this.currentUser = false;
    this.username = '';
    this.router.navigate(['/login']);
  }
}
