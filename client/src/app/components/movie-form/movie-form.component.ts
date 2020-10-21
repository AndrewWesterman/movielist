import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.less'],
})
export class MovieFormComponent implements OnInit {
  movie: Movie = {} as Movie;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.movieService.getMovie(id).subscribe((movie) => (this.movie = movie));
    }
  }

  onSubmit() {
    // convert date to local because apparently humans input things in utc
    let [y, m, d] = this.movie.releaseDate
      .toString()
      .split(/\D/)
      .map((t) => +t);

    // send movie with local date to server
    const parsedMovie = {
      ...this.movie,
      releaseDate: new Date(y, m - 1, d),
    } as Movie;

    if (this.isEdit) {
      this.movieService
        .updateMovie(parsedMovie)
        .subscribe(() => this.location.back());
    } else {
      this.movieService
        .createMovie(parsedMovie)
        .subscribe(() => this.location.back());
    }
  }
}
