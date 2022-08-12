import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

export interface LoginObject {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  handleLogin() {
    this.authService.handleLogin({
      username: this.username,
      password: this.password,
    });
  }
}
