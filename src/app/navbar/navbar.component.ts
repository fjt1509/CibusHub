import { Component, OnInit } from '@angular/core';
import {AuthService} from '../authentication/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  login() {
    this.authService.googleSignin();
  }

  logout() {
    this.authService.signOut();
  }
}
