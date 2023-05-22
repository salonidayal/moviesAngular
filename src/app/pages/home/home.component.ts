import { Component,OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { SliderComponent } from '../../components/slider/slider.component';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularMovies : Movie[] = [];
  upcomingMovies : Movie[] = [];
  topRatedMovies : Movie[] = [];
  latestMovies : Movie[] = [];
  constructor(private moviesService : MoviesService)
  {

  }
  ngOnInit(): void {
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies;

    });
    this.moviesService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies;

    });
    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies;

    });
  }

}
