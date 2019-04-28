import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomepageComponent} from './homepage/homepage.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MzButtonModule, MzCardModule, MzParallaxModule} from 'ngx-materialize';

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MzButtonModule,
    MzCardModule,
    MzParallaxModule
  ]
})
export class HomeModule { }
