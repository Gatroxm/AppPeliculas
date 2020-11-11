import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cartelera, Movie } from '../interfaces/cartelera-response';
import { Cast, Credits } from '../interfaces/credits-response';
import { MovieDetails } from '../interfaces/movie-response';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;
  constructor(private http: HttpClient) { }

  get params(): any {
    return {
      api_key: '8cd44c18fa9e073fe10f6abfff62c84c',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }

  resetCarteleraPage(): void{
    this.carteleraPage = 1;
  }
  getCatelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http.get<Cartelera>(`${this.baseUrl}/movie/now_playing`,
      {
        params: this.params
      })
      .pipe(
        map( (resp) => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }

  buscarPelicula(texto: string): Observable<Movie[]> {
    const params = {...this.params, page: '1', query: texto};
    return this.http.get<Cartelera>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(map((resp) => resp.results));
  }

  getOneMovie(id: string): Observable<MovieDetails> {
    const idmovie = parseInt(id);
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${idmovie}`, {
      params: this.params
    });
  }
  getCredits(id: string): Observable<Cast[]> {
    const idmovie = parseInt(id);
    return this.http.get<Credits>(`${this.baseUrl}/movie/${idmovie}/credits`, {
      params: this.params
    }).pipe(map(resp => resp.cast));
  }
}
