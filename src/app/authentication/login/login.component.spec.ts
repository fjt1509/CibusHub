import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {DOMHelper} from '../../../Test-Helpers/DOMHelper';
import {Location} from '@angular/common';
import {of} from 'rxjs';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let FireAuthMock: any
  let dh: DOMHelper<LoginComponent>;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(
        [
          {path: '', component: DummyComponent },
          {path: 'add/post', component: DummyComponent},
          {path: ':id', component: DummyComponent},
          {path: ':/login', component: DummyComponent}
        ]

      )],
      declarations: [ LoginComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers:[{provide: AuthService, useValue: FireAuthMock}],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    FireAuthMock = jasmine.createSpyObj('AuthService', ['googleSignIn', 'then'])
    //FireAuthMock.googleSignin.and.returnValue();
    //FireAuthMock.then.and.returnValue();
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  class DummyComponent {
  }
});
