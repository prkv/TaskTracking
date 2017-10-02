"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var movie_service_1 = require("../service/movie.service");
var global_1 = require("../shared/global");
var Rx_1 = require("rxjs/Rx");
var MovieComponent = (function () {
    function MovieComponent(_http, _movieService) {
        this._http = _http;
        this._movieService = _movieService;
        this.movieIndexToDisplay = 0;
    }
    MovieComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._movieService.get(global_1.Global.BASE_MOVIE_ENDPOINT)
            .subscribe(function (movies) { _this.movies = movies; }, function (error) { return _this.msg = error; });
        this.movieIndexToDisplay = 0;
        var timer = Rx_1.Observable.timer(2000, 10000);
        timer.subscribe(function (t) { return _this.loadMovie(); });
    };
    MovieComponent.prototype.loadMovie = function () {
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
    };
    return MovieComponent;
}());
MovieComponent = __decorate([
    core_1.Component({
        selector: 'movie-app',
        templateUrl: 'app/components/movie.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http, movie_service_1.MovieService])
], MovieComponent);
exports.MovieComponent = MovieComponent;
//# sourceMappingURL=movie.component.js.map