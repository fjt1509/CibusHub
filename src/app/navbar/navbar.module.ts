import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzIconModule, MzNavbarModule} from 'ngx-materialize';
import {NavbarComponent} from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MzNavbarModule,
    MzIconModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
