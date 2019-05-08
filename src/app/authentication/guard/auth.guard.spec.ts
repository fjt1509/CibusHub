import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from '../auth-routing.module';
import {MzCardModule} from 'ngx-materialize';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {LoginComponent} from '../login/login.component';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [
        RouterTestingModule,
        CommonModule,
        AuthRoutingModule,
        MzCardModule,
        FlexLayoutModule,
        AngularFireDatabaseModule
      ],
      declarations: [
        AuthGuard,
        LoginComponent
      ]
    });
    /*
      it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
      }));
     */
  });
});

