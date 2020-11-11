import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Location } from '@angular/common';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public Movie: MovieDetails;
  public Credits: Cast[];
  constructor(
    private activateRouter: ActivatedRoute,
    private peliculaServices: PeliculasService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    const { id } = this.activateRouter.snapshot.params;
    combineLatest([
      this.peliculaServices.getOneMovie(id),
      this.peliculaServices.getCredits(id)
    ]).subscribe(([pelicula, actores]) => {
      if (!pelicula) {
        this.router.navigate(['home']);
        return;
      }
      this.Movie = pelicula;
      this.Credits = actores.filter(cast => cast.profile_path !== null);

    });
  }
  regresar(): void {
    this.location.back();
  }
}
