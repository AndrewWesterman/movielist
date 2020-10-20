import { Adapter } from './utilities/adapter';

export class Movie {
  constructor(
    public id: number,
    public title: string,
    public director: string,
    public releaseDate: string
  ) {}
}

// This must be updated any time API return data changes
export class MovieAdapter implements Adapter<Movie> {
  // Convert json obj to Movie with our named props
  adapt(obj: any): Movie {
    return new Movie(obj._id, obj.title, obj.director, obj.release_date);
  }
}
