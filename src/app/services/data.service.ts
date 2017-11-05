import { BadRequestError } from './../common/bad-request-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

    constructor(private url: string, private http: Http) {

    }

    get(id) {
        return this.http.get(this.url + '/' + id)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getAll() {
        return this.http.get(this.url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    create(resource) {
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.url, JSON.stringify(resource), options)
            .map(response => response.json())
            .catch(this.handleError);
    }

    update(resource) {
        return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource))
            .map(response => response.json())
            .catch(this.handleError);
    }

    delete(id) {
        return this.http.delete(this.url + '/' + id)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        if (error.status === 400)
            return Observable.throw(new BadRequestError(error.json()));

        if (error.status === 404)
            return Observable.throw(new NotFoundError());

        return Observable.throw(new AppError(error));
    }
}
