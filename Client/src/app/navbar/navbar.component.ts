import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  handleLogout() {
    this.authService.handleLogout();
  }
}
