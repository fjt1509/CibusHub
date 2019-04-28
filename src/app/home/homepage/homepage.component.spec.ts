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

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

