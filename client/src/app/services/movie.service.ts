import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieAdapter } from '../models/movie';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesUrl = 'api/movies';

  constructor(private http: HttpClient, private adapter: MovieAdapter) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get(this.moviesUrl).pipe(
      map((data: any[]) => data.map((movie) => this.adapter.adapt(movie))),
      catchError(this.handleError<any>('getMovies'))
    );
  }

  getMovie(id: string): Observable<Movie> {
    return of({} as Movie);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return of({} as Movie);
  }

  updateMovie(movie: Movie): Observable<any> {
    return of({});
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
