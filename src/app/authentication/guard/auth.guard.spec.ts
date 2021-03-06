import {TestBed, async, inject, ComponentFixture} from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from '../auth-routing.module';
import {MzCardModule} from 'ngx-materialize';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {LoginComponent} from '../login/login.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../shared/auth.service';
let AuthServiceMock: any;
let component: AuthGuard;
let fixture: ComponentFixture<AuthGuard>;
describe('AuthGuard', () => {
  beforeEach(async () => {
    AuthServiceMock = jasmine.createSpyObj('AuthService', ['authState']);
    TestBed.configureTestingModule({
      providers: [AuthGuard, {provide: AuthService, useValue: AuthServiceMock}],
      imports: [
        RouterTestingModule,
        CommonModule,
        HttpClientTestingModule,
        MzCardModule,
        FlexLayoutModule,
        AngularFireDatabaseModule
      ],
      declarations: [
        AuthGuard,
        LoginComponent
      ]

    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AuthGuard);
      component = fixture.componentInstance;
      fixture.detectChanges();


    });
    it('should create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
    }));
    it('should call Authservice once', inject([AuthGuard], (guard: AuthGuard) => {
      fixture.detectChanges();
      expect(AuthServiceMock.authState).toHaveBeenCalledTimes(1);
    }));

});
}
);
