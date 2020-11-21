import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ApiService } from '../service/api.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  @ViewChild('movieSearchInput', {static : true}) movieSearhInput: ElementRef;
  listOfMovieResult;
  isSearching = false;
  latestMovie;
  selectedMovie;
  moviecasts = [];
  trailerSafeSource: SafeResourceUrl;

  constructor(
    private apiService : ApiService,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) { 
    this.isSearching = false;
    this.listOfMovieResult = [];

  }

  ngOnInit(): void {    
    this.apiService.getLatestMovie().subscribe(data => {
        this.latestMovie = data;
        console.log(data);
    });

    fromEvent(this.movieSearhInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      filter(res => {
        return res.length > 2
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((text) => {
      this.isSearching = true;
      this.apiService.searchMovies(text).subscribe((res: any) => {
        this.listOfMovieResult = res.results.slice(0, 5);
        console.log(this.listOfMovieResult);
        this.isSearching = false;
      }, (err) => {
        this.isSearching = false;
      })  
    })
  }

  selectMovie(id) {
    this.apiService.getMovieDetail(id).subscribe(data => {
      this.selectedMovie = data;
      this.renderer.setValue(this.movieSearhInput.nativeElement, '');
      this.listOfMovieResult = [];
      console.log(data);
      this.apiService.getMovieCast(id).subscribe((result: any) => {
        console.log(result);
        this.moviecasts = result.cast;
      });

      this.apiService.getMovieTrailer(id).subscribe((trailers: any) => {

        this.trailerSafeSource = undefined;
        for (let trailer of trailers.results){
          if(trailer.type == "Trailer") {
            this.trailerSafeSource = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + trailer.key);
            break;
          }
        }
        if (this.trailerSafeSource == undefined) {
          this.trailerSafeSource = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + trailers.results[0].key);
        }
      })
    })
  }

  getRandomMovie() {
    const generatedMovieId = this.getRandomInt(this.latestMovie.id);
    this.apiService.getMovieDetail(generatedMovieId).subscribe(data => {
      this.selectedMovie = data;
      this.apiService.getMovieCast(generatedMovieId).subscribe((result: any) => {
        console.log(result);
        this.moviecasts = result.cast;
      });
      this.apiService.getMovieTrailer(generatedMovieId).subscribe((trailers: any) => {

        this.trailerSafeSource = undefined;
        for (let trailer of trailers.results){
          if(trailer.type == "Trailer") {
            this.trailerSafeSource = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + trailer.key);
            break;
          }
        }
        if (this.trailerSafeSource == undefined) {
          this.trailerSafeSource = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + trailers.results[0].key);
        }
      })
    });
  }

  private getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
