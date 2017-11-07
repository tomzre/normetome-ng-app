import { QuestionsService } from './../services/questions.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any[];

  constructor(
    private service: QuestionsService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(questions => {
        this.questions = questions;
      },
      (error: AppError) => {
        this.toastr.error('An error has occured :/', "Oops! something went wrong...");
      });
  }

  remove(question) {
    let index = this.questions.indexOf(question);

    if (confirm("Are you sure to delete " + question.description)) {
      this.questions.splice(index, 1);
      this.service.delete(question.id)
        .subscribe(
        () => {
          this.toastr.warning('Item of id: ' + index + ', has been deleted!', "Warning!");
        },
        (error: AppError) => {
          this.questions.splice(index, 0, question);

          if (error instanceof NotFoundError)
            this.toastr.error("This question has been already deleted.", "Oops!");
          else
            throw error;
        });
    }
  }

}
