import { QuestionsService } from './services/questions.service';
import { AlertModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppErrorHandler } from './common/app-error-handler';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CarouselHeaderComponent } from './carousel-header/carousel-header.component';
import { QuestionsComponent } from './questions/questions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { HttpModule } from '@angular/http';
import { CategoriesService } from './services/categories.service';
import { FormsModule } from '@angular/forms';


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
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
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
        path: 'questions', component: QuestionsComponent
      },
      {
        path: '**', component: NotFoundComponent
      }
    ])
  ],
  providers: [
    QuestionsService,
    CategoriesService,
    { provide: ErrorHandler, useClass: AppErrorHandler }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
