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
    if (this.isEdit) {
      this.movieService
        .updateMovie(this.movie)
        .subscribe(() => this.location.back());
    } else {
      this.movieService
        .createMovie(this.movie)
        .subscribe(() => this.location.back());
    }
  }
}
