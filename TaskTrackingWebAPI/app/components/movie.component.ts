import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IMovie } from '../models/movie';
import { MovieService } from '../service/movie.service';
import { Global } from '../shared/global';
import { Observable, Subscription  } from 'rxjs/Rx';

@Component({
    selector: 'movie-app',
    templateUrl: 'app/components/movie.component.html'

})

export class MovieComponent implements OnInit {

    movies: IMovie[];
    msg: string;
    movieIndexToDisplay: number=0;
    movieToDisplay: IMovie;
        
    constructor(private _http: Http, private _movieService: MovieService) {

    }
    ngOnInit(): void {
        this._movieService.get(Global.BASE_MOVIE_ENDPOINT)
            .subscribe(movies => { this.movies = movies; },
            error => this.msg = <any>error);

        this.movieIndexToDisplay = 0;

        let timer = Observable.timer(2000, 10000);
        timer.subscribe(t => this.loadMovie());
    }

    

    loadMovie(): void {

        if (this.movieIndexToDisplay == NaN) {
            this.movieIndexToDisplay = 0;
        }
        else {
            if (this.movieIndexToDisplay == 10) {
                this.movieIndexToDisplay = 1;
            }
            else {
                this.movieIndexToDisplay += 1;
            }
        }
        
        //console.log('MovieComponent:=' + this.movieIndexToDisplay);

        if (this.movies != null) {
            this.movieToDisplay = this.movies[this.movieIndexToDisplay - 1];
            //console.log(this.movieToDisplay.Released);
        }
    }
    

    
}
