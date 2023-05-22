import { Component,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { Movie, MovieCredits, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieImages } from 'src/app/models/movie';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy{

  movie: Movie | null = null;
  movieVideos : MovieVideo[] = [];
  imagesSizes = IMAGES_SIZES;
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];
  constructor(private route : ActivatedRoute, private moviesService: MoviesService){

  }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({id}) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getMovieSimilar(id);
    })
  }
  getMovie(id: string)
  {
    this.moviesService.getMovie(id).subscribe((movieData) =>
      {
        this.movie=movieData;
        console.log(this.movie);
      })
  }
  getMovieSimilar(id: string) {
    this.moviesService.getMovieSimilar(id).subscribe((movieSimilarData) => {
      this.similarMovies = movieSimilarData;
    });
  }


  getMovieVideos(id: string)
  {
    this.moviesService.getMovieVideos(id).subscribe(movieVideoData =>{
      this.movieVideos = movieVideoData;
    })
  }

  

  getMovieImages(id: string)
  {
    this.moviesService.getMovieImages(id).subscribe((movieImagesData) =>
      {
        this.movieImages = movieImagesData;
      })
  }

  getMovieCredits(id: string)
  {
    this.moviesService.getMovieCredits(id).subscribe((movieCreditsData) =>
      {
        this.movieCredits = movieCreditsData;
        console.log(this.movieCredits);
      })
  }

  ngOnDestroy(): void {
    
  }

}
