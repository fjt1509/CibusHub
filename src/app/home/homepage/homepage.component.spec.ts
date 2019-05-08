import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from '../home-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MzButtonModule, MzCardModule, MzParallaxModule} from 'ngx-materialize';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {DOMHelper} from '../../../Test-Helpers/DOMHelper';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let dh: DOMHelper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HomeRoutingModule,
        FlexLayoutModule,
        MzButtonModule,
        MzCardModule,
        MzParallaxModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
          [
            { path: '', component: DummyComponent},
            { path: 'forums', component: DummyComponent}
          ]
        )
      ],
      declarations: [ HomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dh = new DOMHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain h1 tag', function () {
      expect(dh.singleText('h1')).toBe('A Forum For Food Enthusiasts');
  });

  it('should contain atleast 1 button', function () {
      expect(dh.count('button')).toBeGreaterThanOrEqual(1);
  });

  it('should be a Go To Forum button on the page', function () {
      expect(dh.singleText('button')).toBe('GO TO FORUM');
  });

  it('Should navigate to /forums on button click', () => {
    const location = TestBed.get(Location);
    const linkDes = fixture.debugElement.queryAll(By.css('Button'));
    const navigationButton: HTMLButtonElement = linkDes[0].nativeElement;
    navigationButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => expect(location.path()).toBe('/forums'));
  });
});

class DummyComponent {}

