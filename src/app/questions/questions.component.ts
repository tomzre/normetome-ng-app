import { QuestionsService } from './../services/questions.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any[];

  constructor(
    private service: QuestionsService,
    public toastr: ToastsManager,
    private vcr: ViewContainerRef ) {
      this.toastr.setRootViewContainerRef(vcr);
  }
  
  ngOnInit() {
    this.service.getAll()
      .subscribe(questions => {
        this.questions = questions;
      },
    (error : AppError) => {
      this.toastr.error('An error has occured :/', "Oops! something went wrong...")
      
      
      
    });
  }

}
