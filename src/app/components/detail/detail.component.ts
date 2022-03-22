import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  pokemon: Pokemon;
  img: string;
  name: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ionViewDidEnter(){
    const url = this.route.snapshot.paramMap.get('url');
    console.log('URL',url);
    this.apiService.getPokeDetail(url).subscribe(response=>{
      this.pokemon = response;
      this.img = this.pokemon.sprites.front_default;
      console.log(response);
    });
  }

  ngOnInit() {
    //
  }

}
