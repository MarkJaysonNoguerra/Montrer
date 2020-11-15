import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from '@angular/router';
import { ActorsComponent } from './actors/actors.component';
import { MoviesComponent } from './movies/movies.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';


const routes: Routes = [
    { path : "movie", component : MoviesComponent},
    { path : "tv", component : TvSeriesComponent},
    { path : "actor", component : ActorsComponent}
];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
export const routingComponents = [MoviesComponent, TvSeriesComponent, ActorsComponent];