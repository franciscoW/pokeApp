import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokedexPaginator } from '../models/pokedex-paginator';
import { Pokemon } from '../models/pokemon';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.baseUrlPokedex;

  }

  getPokeList(url?: string): Observable<PokedexPaginator>{
    url = (! url) ? this.apiURL : url;
    console.log('API',url);
    return this.http.get<PokedexPaginator>(url).pipe(
      tap(response =>{
        const list = response.results;
        list.forEach(res=>{
          this.getPokeDetail(res.url).subscribe(poke=>{
            res.pokemon = poke;
          });
        });
        return of(response);
      })
    );
  }

  getPokeDetail(url: string=''): Observable<Pokemon>{
    console.log('Entro');
    return this.http.get<Pokemon>(`${url}`);
  }
}
