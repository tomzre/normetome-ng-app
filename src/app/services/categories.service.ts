import { Http } from '@angular/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriesService extends DataService{

  constructor(http: Http) { 
    super('http://localhost:52276/api/categories', http) 
  }
  

}