import { Component, Input } from '@angular/core';
import {Pokemon} from './pokemon';
import { HttpClient } from '@angular/common/http';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeMon-Go-Search';
  evolutionData: string;
  weaknessData: string;
  detailData: string;
  detailName: string;
  evolutionName: string;
  weaknessName: string;
  Pokedictionary: any;
  detail: Array<Pokemon>;
  constructor(private http: HttpClient){
   http.get('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json').subscribe(data => {
     this.Pokedictionary = data;
     if (this.Pokedictionary.hasOwnProperty('pokemon')) {
       this.detail = this.Pokedictionary.pokemon;
     }
   });
  }

    findDetails(value: string){
     this.detailData = '';
     this.detailName = value;
     console.log(this.detail);
     this.detail.forEach(element => {
      if (element.name === this.detailName){
        this.detailData = JSON.stringify(element);
      }
    });
  }

    findByEvolutions(value: string){
      this.evolutionData = '';
      this.evolutionName = value;
      console.log(this.detail);
      this.detail.forEach(element => {
      console.log(element);
      if (element.next_evolution){
      element.next_evolution.forEach(element1 => {
        if (element1.name === this.evolutionName) {
        this.evolutionData += element.name + ', ';
        }
      });
    }});
    }

    findByWeakness(value: string){
      this.weaknessData = '';
      this.weaknessName = value;
      this.detail.forEach(element => {
      if (element.weaknesses.includes(this.weaknessName)) {
      this.weaknessData += element.name + ', ';
        }
      });

    }
  }
