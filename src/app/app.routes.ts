import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { QuestionFormComponent } from "./question-form/question-form.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { QuestionsComponent } from "./questions/questions.component";
import { CategoryFormComponent } from "./category-form/category-form.component";
import { CategoriesComponent } from "./categories/categories.component";
import { AdminComponent } from "./admin/admin.component";
import { CallbackComponent } from "./callback/callback.component";
import { ProfileComponent } from "./profile/profile.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const ROUTES: Routes = [
    {
        path: '', component: HomeComponent
      },
      {
        path: 'question/new', component: QuestionFormComponent, canActivate: [AuthGuardService], data: { requiredRoles: ['Admin'] }
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
];