import { AlertModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CarouselHeaderComponent } from './carousel-header/carousel-header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarouselHeaderComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent
      }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
