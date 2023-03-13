import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';


@Component({
  selector: 'app-v-home-search',
  templateUrl: './v-home-search.component.html',
  styleUrls: ['./v-home-search.component.scss']
})

export class VHomeSearchComponent implements OnInit {
  searchResult;

  artworks: any[];

  //Filtros
  nameFilter: string[] = [];
  artistFilter: string[] = [];
  styleFilter: string[] = [];
  museumFilter: string[] = [];

  userRatings = [];
  page: number = 1;
  timeout = null;

  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.getAllArtworks()
  }

  getAllArtworks() {
    this.artworkService.getAllArtworks().subscribe(data => {
      this.loadData(data);
    });
  }

  triggerFilterOptions(event, filterType) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.filterLimitOptions(event.target.value, filterType);
    }, 600);
  }

  filterLimitOptions(text, type){
    //Copia de los datos, para aplicarles cambios sin perder el original
    let filterAllOptions: string[] = this.searchResult[type];

    if(type === 'nameFilter'){
      this.nameFilter = filterAllOptions.filter(str => str.toLowerCase().includes(text.toLowerCase()));
    }

    if(type === 'artistFilter'){
      this.artistFilter = filterAllOptions.filter(str => str.toLowerCase().includes(text.toLowerCase()));
    }

    if(type === 'styleFilter'){
      this.styleFilter = filterAllOptions.filter(str => str.toLowerCase().includes(text.toLowerCase()));
    }

    if(type === 'museumFilter'){
      this.museumFilter = filterAllOptions.filter(str => str.toLowerCase().includes(text.toLowerCase()));
    }
  }

  filterSetOption(option, filterId){
    (document.getElementById(filterId) as HTMLInputElement).value = option;
    document.getElementById(filterId).style.pointerEvents = 'none';
    document.getElementById(`${filterId}-dropdown`).style.display = 'none'

    this.findFiltered()
  }

  findFiltered() {
    let params = {};

    if((document.getElementById('nameFilter') as HTMLInputElement).value != ""){
      params['nameFilter'] = (document.getElementById('nameFilter') as HTMLInputElement).value;
    }

    /*
    if((document.getElementById('artist-filter') as HTMLInputElement).value != ""){
      options['artistFilter'] = (document.getElementById('name-filter') as HTMLInputElement).value;
    }

    if((document.getElementById('style-filter') as HTMLInputElement).value != ""){
      options['styleFilter'] = (document.getElementById('name-filter') as HTMLInputElement).value;
    }

    if((document.getElementById('museum-filter') as HTMLInputElement).value != ""){
      options['museumFilter'] = (document.getElementById('name-filter') as HTMLInputElement).value;
    }
    */

    this.artworkService.findFiltered(params).subscribe(data => {
      this.loadData(data);
    });
  }

  loadData(data){
    this.searchResult = data;
    this.artworks = data.artworks;

    this.nameFilter = data.nameFilter;
  }
}
