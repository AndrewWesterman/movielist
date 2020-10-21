import { Injectable } from '@angular/core';
import { Adapter } from './utilities/adapter';

export class Movie {
  constructor(
    public id: number,
    public title: string,
    public director: string,
    public releaseDate: Date
  ) {}
}

// This must be updated any time API return data changes
@Injectable({
  providedIn: 'root',
})
export class MovieAdapter implements Adapter<Movie> {
  // Convert json obj to Movie with our named props
  adapt(obj: any): Movie {
    return new Movie(obj._id, obj.title, obj.director, obj.release_date);
  }

  // Convert movie back to expected json structure
  revert(movie: Movie): any {
    const { id, title, director, releaseDate } = movie;
    return {
      _id: id,
      title,
      director,
      release_date: releaseDate,
    };
  }
}
