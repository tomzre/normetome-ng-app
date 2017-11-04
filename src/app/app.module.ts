import { QuestionsService } from './services/questions.service';
import { AlertModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CarouselHeaderComponent } from './carousel-header/carousel-header.component';
import { QuestionsComponent } from './questions/questions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuestionFormComponent } from './question-form/question-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarouselHeaderComponent,
    QuestionsComponent,
    NotFoundComponent,
    QuestionFormComponent
    
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    ToastModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent
      },
      {
        path: 'questions/new', component: QuestionFormComponent
      },
      {
        path: '**', component: NotFoundComponent
      }
    ])
  ],
  providers: [
    QuestionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
