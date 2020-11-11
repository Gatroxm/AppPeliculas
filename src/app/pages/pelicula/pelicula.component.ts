import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Location } from '@angular/common';
import { Cast, Credits } from 'src/app/interfaces/credits-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public Movie: MovieDetails;
  public Credits: Cast[];
  constructor( private activateRouter: ActivatedRoute, private peliculaServices: PeliculasService, private location: Location ){}

  ngOnInit(): void {
      const {id} = this.activateRouter.snapshot.params;
      this.peliculaServices.getOneMovie(id).subscribe( movie => {
        this.Movie = movie;
      });
      this.peliculaServices.getCredits(id).subscribe( credits => {
        console.log(credits)
        this.Credits = credits;
      })
  }
  regresar(): void {
    this.location.back();
  }
}
