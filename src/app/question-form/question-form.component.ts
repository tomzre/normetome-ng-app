import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { QuestionsService } from '../services/questions.service';
import { AppError } from '../common/app-error';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  categories: any[];
  constructor(
      private categoriesService: CategoriesService,
      private questionService: QuestionsService,
      public toastr: ToastsManager,
      private vcr: ViewContainerRef ) 
      {
        this.toastr.setRootViewContainerRef(vcr);
      }

  ngOnInit() {
      this.categoriesService.getAll()
        .subscribe(categories => this.categories = categories,
        (error: AppError) => {
          this.toastr.error('An error has occured.', 'Oops! Something went wrong :/')
        });
  }

}
