import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokedexPaginator, Result } from '../models/pokedex-paginator';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  data: Result[];
  nextResults: string;
  img: string;
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getResults();
  }

  public loadData(event){
    this.getResults(this.nextResults,event);
  }


  public goToDetail(info){
    console.log('Detail',info);
    this.router.navigate(['/detail',{url:info.url}]);
  }


  private getResults(urlResults: string='', event: any=null){
    this.apiService.getPokeList(urlResults).subscribe(response=>{
      this.data = response.results;
      if(response.next != null){
        this.nextResults = response.next;
      }else{
        event.target.disabled = true;
      }

      if(event !== null){
        event.target.complete();
      }

      console.log(response);
    });
  }





}
