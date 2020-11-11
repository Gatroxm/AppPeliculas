import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Cartelera, Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(): void{
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      if ( this.peliculasServices.cargando ) { return; }
      this.peliculasServices.getCatelera().subscribe( movies => {
        this.movies.push(...movies);
      });
    }

  }
  constructor( private peliculasServices: PeliculasService) { }

  ngOnInit(): void {
    this.peliculasServices.getCatelera().subscribe(movies => {
      this.movies = movies;
      this.moviesSlideShow = movies;
    });
  }

  ngOnDestroy(): void {
    this.peliculasServices.resetCarteleraPage();
  }
}
