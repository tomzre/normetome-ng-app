import { QuestionsService } from './services/questions.service';
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
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
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { CategoriesService } from './services/categories.service';
import { FormsModule } from '@angular/forms';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './services/auth-guard.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarouselHeaderComponent,
    QuestionsComponent,
    NotFoundComponent,
    QuestionFormComponent,
    CategoryFormComponent,
    CategoriesComponent,
    CallbackComponent,
    ProfileComponent,
    AdminComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    ToastModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent
      },
      {
        path: 'question/new', component: QuestionFormComponent
      },
      {
        path: 'questions', component: QuestionsComponent
      },
      {
        path: 'category/new', component: CategoryFormComponent
      },
      {
        path: 'categories', component: CategoriesComponent
      },
      {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], data: { requiredRoles: ['Admin'] }
      },
      { 
        path: 'callback', component: CallbackComponent 
      },
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: '**', component: NotFoundComponent
      }
    ])
  ],
  providers: [
    QuestionsService,
    CategoriesService,
    AuthService,
    AuthGuardService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
