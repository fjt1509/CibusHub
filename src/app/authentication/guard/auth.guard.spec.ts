import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from '../auth-routing.module';
import {MzCardModule} from 'ngx-materialize';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoginComponent} from '../login/login.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';


describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        AuthRoutingModule,
        MzCardModule,
        FlexLayoutModule,
        AngularFireDatabaseModule,
        AngularFireDatabaseModule
      ],
      providers: []
      ,
      declarations: [LoginComponent]
    });
  });

  /*/it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
 }));
 /*/});
