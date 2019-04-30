import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../authentication/shared/auth.service';
import {User} from '../authentication/shared/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User;
  sub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.sub = this.authService.user$.subscribe( user => {this.user = user; console.log(this.user); });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.authService.signOut();
  }
}
