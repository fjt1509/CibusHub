import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {CommonModule} from '@angular/common';
import {
  MzButtonModule,
  MzCardComponent,
  MzCardModule,
  MzIconModule,
  MzNavbarModule,
  MzParallaxModule,
  MzSidenavModule
} from 'ngx-materialize';
import {AuthService} from '../authentication/shared/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {DOMHelper} from '../../Test-Helpers/DOMHelper';
import {HomeRoutingModule} from '../home/home-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HomeModule} from '../home/home.module';
import {of} from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dh: DOMHelper<NavbarComponent>;
  let FireAuthMock: any;
  beforeEach(async(() => {
    FireAuthMock = jasmine.createSpyObj('AuthService', ['authState']);
    FireAuthMock.authState.and.returnValue(of({uid: 'testUser', email: 'blya@kurwa.cyka' }));
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        CommonModule,
        HomeRoutingModule,
        FlexLayoutModule,
        MzButtonModule,
        MzCardModule,
        MzParallaxModule,
        BrowserAnimationsModule,
        HomeModule,
        MzButtonModule,
        MzSidenavModule,
        MzNavbarModule,
        RouterModule.forRoot(
          [
            { path: '', component: DummyComponent},
            { path: 'forums', component: DummyComponent}
          ]
        )
      ],
      providers: [
        {provide: AuthService, useValue: FireAuthMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dh = new DOMHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain a tag', function () {
      expect(dh.singleText('a')).toBe('CibusHub');
  });
  it('should contain home', function () {
      expect(dh.singleText('mz-navbar-item')).toBe('homeHome');
  });
});



class DummyComponent {}
