import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MovieDto, MovieImages, MovieVideoDto, MovieCredits } from '../models/movie';
import { Movie } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresDto } from '../models/genre';



@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3/';
  apiKey: string = '3ca6a377f21348fa43ccde6246bd5a16';

  constructor(private http: HttpClient) { }

  public getMovies(type: string= 'upcoming', count: number = 18)
  {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(switchMap(res =>{
      return of(res.results.slice(0,count));
    }));
    // return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=3ca6a377f21348fa43ccde6246bd5a16');
  }

  public getMovieVideos(id: string)
  {
    return this.http.get<MovieVideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`).pipe(switchMap(res =>{
      return of(res.results);
    }));
  }

  public getMoviesGenres()
  {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`).pipe(switchMap(res =>{
      return of(res.genres);
    }));
  }


  getMovieSimilar(id: string) {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/movie/${id}/similar?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, 12));
        })
      );
  }
  public getMovieImages(id: string){
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`)
  
  }

  public getMovieCredits(id: string){
    return this.http.get<MovieCredits>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
  
  }

  getMoviesByGenre(genreId: string, pageNumber: number) {
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }



public getMovie(id: string){
  return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`)

}

  public searchMovies(page: number)
  {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/popular?page=1&api_key=${this.apiKey}`).pipe(switchMap(res =>{
      return of(res.results);
    }));
  }
}
