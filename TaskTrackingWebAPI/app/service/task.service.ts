import { Injectable } from '@angular/core';
import { ITask } from '../models/task';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Global } from '../shared/global';

@Injectable()
export class TaskService {

    constructor(private _http: Http) {

    }

    get(url: string): Observable<ITask[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers = this.jwt(headers);
        let options = new RequestOptions({ headers: headers });

        return this._http.get(url, options)
            .map((response: Response) => <ITask[]>response.json())
            .catch(this.handleError);
    }

    post(url: string, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers = this.jwt(headers);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(url, body, options)
      .map((response: Response) => <any>response)
      .catch(this.handleError);
  }

  put(url: string, id: number, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers = this.jwt(headers);
    let options = new RequestOptions({ headers: headers });
    return this._http.put(url+id, body, options)
      .map((response: Response) => <any>response)
      .catch(this.handleError);
  }

  delete(url: string, id: number): Observable<any> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers = this.jwt(headers);
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(url+id,options)
      .map((response: Response) => <any>response)
      .catch(this.handleError);
  }
    
private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

private jwt(headers: Headers): Headers {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        headers.append('Authorization', 'Bearer ' + currentUser.token)
        return headers;
    }
}
}