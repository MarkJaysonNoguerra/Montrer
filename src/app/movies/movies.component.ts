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

  constructor(
    private apiService : ApiService,
    private renderer: Renderer2
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
      this.apiService.searchMovies(text).subscribe(res => {
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
      console.log(this.movieSearhInput);
      // this.movieSearhInput.nativeElement = "";
      this.renderer.setValue(this.movieSearhInput.nativeElement, '');
      this.listOfMovieResult = [];
      console.log(data);
    })
  }

  getRandomMovie() {
    this.apiService.getMovieDetail(this.getRandomInt(this.latestMovie.id)).subscribe(data => {
      this.selectedMovie = data;
    })
  }

  private getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
