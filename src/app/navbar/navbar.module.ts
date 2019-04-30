import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzButtonModule, MzIconModule, MzNavbarModule, MzSidenavModule} from 'ngx-materialize';
import {NavbarComponent} from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MzNavbarModule,
    MzIconModule,
    MzSidenavModule,
    MzButtonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
