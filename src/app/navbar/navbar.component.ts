import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../authentication/shared/auth.service';
import {User} from '../authentication/shared/user.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User;
  sub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.sub = this.authService.user$.subscribe( user => {this.user = user; });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.authService.signOut();
  }

  goToForum() {
    this.router.navigateByUrl('/forums');
  }

  goToHome() {
    this.router.navigateByUrl('/');
  }

  goToMyPosts() {
    this.router.navigateByUrl('/forums/user/myPosts');
  }
}
