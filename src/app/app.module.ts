import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { NavbarComponent } from './navbar/navbar.component';
import {MzNavbarModule} from 'ngx-materialize';
import {NavbarModule} from './navbar/navbar.module';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {PostState} from './forum-posts/store/post.state';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    NavbarModule,
    HttpClientModule,
    NgxsModule.forRoot([
      PostState
    ])
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
