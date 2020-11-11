import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  public movies: Movie[] = [];
  public busqueda: string = '';
  constructor(private activateRouter: ActivatedRoute, private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.activateRouter.params.subscribe(params => {
      this.busqueda = params.texto;
      this.peliculasService.buscarPelicula(params.texto).subscribe(movies => {
        this.movies = movies;
      });
    });
  }

}
