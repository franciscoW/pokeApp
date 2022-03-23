import { Pokemon } from './pokemon';


export interface PokedexPaginator {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];

}

export interface Result {
  name: string;
  url:  string;
  pokemon?: Pokemon;
}
