import { Http } from '@angular/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CategoriesService extends DataService{

  constructor(http: Http, authHttp: AuthHttp) { 
    super('http://localhost:52276/api/category', http, authHttp) 
  }
  

}