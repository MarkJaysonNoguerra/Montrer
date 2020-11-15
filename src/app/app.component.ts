import { Component } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Montrer';

  constructor (
    private apiService : ApiService
  ) {
    // this.apiService.getMovieDetail(764228).subscribe(data => {
    //   console.log(data);
    // })
    // this.apiService.searchTvSeries("Big Bang").subscribe(data => {
    //   console.log(data);
    // })
  }

}
