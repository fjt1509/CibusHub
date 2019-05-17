import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from '../auth-routing.module';
import {MzCardModule} from 'ngx-materialize';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {Router} from '@angular/router';
let FireAuthMock: any;
let FireStoreMock: any;
let pipeMock: any;
describe('AuthService', () => {
  beforeEach( () => {
    FireAuthMock = jasmine.createSpyObj('AuthService', ['authState'])
    FireStoreMock = jasmine.createSpyObj('AngularFireStore', ['dispatch']);
    pipeMock = jasmine.createSpyObj('authState', ['pipe']);
    pipeMock.pipe.and.returnValue(of({uid: 'testUser', email: 'blya@kurwa.cyka' }));
    TestBed.configureTestingModule({

      imports: [
        CommonModule,
        MzCardModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes(
          [
            {path: 'login', component: DummyComponent}])
      ],
      providers: [{provide: AngularFireAuth, useValue: FireAuthMock},
        {provide: AngularFirestore, useValue: FireStoreMock}]
    })
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });


class DummyComponent {

}
});
