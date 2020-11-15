import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const HTTPHEADER = new HttpHeaders({
  'Authorization': `Bearer ${environment.apiToken}`
})
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient : HttpClient
  ) { 
    console.log(API_URL);
  }

  getMovieDetail(id) {
    return this.httpClient.get(API_URL + 'movie/' + id, {headers: HTTPHEADER});
  }

  getTvSeriesDetail(id) {
    return this.httpClient.get(API_URL + 'tv/' + id, {headers: HTTPHEADER});
  }

  searchTvSeries(query) {
    const params = new HttpParams().set('query', query);
    return this.httpClient.get(API_URL + 'search/tv', {headers: HTTPHEADER, params});
  }

  searchMovies(query) {
    const params = new HttpParams().set('query', query);
    return this.httpClient.get(API_URL + 'search/movie', {headers: HTTPHEADER, params});    
  }

  getMovieRecommendations(id) {
    return this.httpClient.get(API_URL + 'movie/' + id + "/recommendations", {headers: HTTPHEADER});
  }
  
  getTvSeriesRecommendations(id) {
    return this.httpClient.get(API_URL + 'tv/' + id + "/recommendations", {headers: HTTPHEADER});
  }

  getMovieTrailer(id) {
    return this.httpClient.get(API_URL + 'movie/' + id + "/videos", {headers: HTTPHEADER});
  }

  getTvSeriesTrailer(id) {
    return this.httpClient.get(API_URL + 'tv/' + id + "/videos", {headers: HTTPHEADER});
  }

  getMovieCast(id) {
    return this.httpClient.get(API_URL + 'movie/' + id + "/credits", {headers: HTTPHEADER});
  }  
  
  getTvSeriesCast(id) {
    return this.httpClient.get(API_URL + 'tv/' + id + "/credits", {headers: HTTPHEADER});
  }  

  getActorDetails(id) {
    return this.httpClient.get(API_URL + 'person/' + id, {headers: HTTPHEADER});
  }

  getLatestTvSeries() {
    return this.httpClient.get(API_URL + "tv/latest", {headers: HTTPHEADER});
  }

  getLatestMovie() {
    return this.httpClient.get(API_URL + "movie/latest", {headers: HTTPHEADER});
  }

}
