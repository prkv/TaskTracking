import { Injectable } from '@angular/core';
import { IMovie } from '../models/movie';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class MovieService {

    constructor(private _http: Http) {

    }

    get(url: string): Observable<IMovie[]> {
        return this._http.get(url)
            .map((response: Response) => <IMovie[]>response.json())
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}