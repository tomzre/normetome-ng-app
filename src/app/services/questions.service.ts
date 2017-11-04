import { Http } from '@angular/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class QuestionsService extends DataService{

  constructor(http: Http) { 
    super('', http) 
  }
  

}
