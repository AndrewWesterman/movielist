import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie, MovieAdapter } from '../models/movie';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesUrl = 'api/movies';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private adapter: MovieAdapter) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get(this.moviesUrl).pipe(
      map((data: any[]) => data.map((movie) => this.adapter.adapt(movie))),
      catchError(this.handleError<any>('getMovies'))
    );
  }

  getMovie(id: string): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get(url).pipe(
      map((movie) => this.adapter.adapt(movie)),
      catchError(this.handleError<any>('getMovie'))
    );
  }

  createMovie(movie: Movie): Observable<Movie> {
    const movieToCreate = this.adapter.revert(movie);
    return this.http.post(this.moviesUrl, movieToCreate, this.httpOptions).pipe(
      map((movie) => this.adapter.adapt(movie)),
      catchError(this.handleError<any>('createMovie'))
    );
  }

  updateMovie(movie: Movie): Observable<Movie> {
    const url = `${this.moviesUrl}/${movie.id}`;
    const movieToUpdate = this.adapter.revert(movie);
    return this.http.put(url, movieToUpdate, this.httpOptions).pipe(
      map((movie) => this.adapter.adapt(movie)),
      catchError(this.handleError<any>('updateMovie'))
    );
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
