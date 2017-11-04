import { QuestionsService } from './../services/questions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private service: QuestionsService) { }
  questions: any[];
  ngOnInit() {
    this.service.getAll()
      .subscribe(questions => {
        this.questions = questions;
      });
  }

}
