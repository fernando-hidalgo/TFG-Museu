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
  page: number = 1;
  timeout = null;

  //NOMBRE
  nameFilter: string[] = [];
  showNameOptions = false;
  nameOptionsX = 0
  nameOptionsY = 0

  //ARTISTA
  artistFilter: string[] = [];
  showArtistOptions = false;
  artistOptionsX = 0
  artistOptionsY = 0

  //ESTILO
  styleFilter: string[] = [];
  showNameStyle = false;
  styleOptionsX = 0
  styleOptionsY = 0

  //MUSEO
  museumFilter: string[] = [];
  showNameMuseum = false;
  museumOptionsX = 0
  museumOptionsY = 0

  userRatings = [];

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
    //document.getElementById(`${filterId}-dropdown`).style.display = 'none'

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

  onFocus(){
    this.showNameOptions = true;
  }
  
  onBlur(){
    //Blur rápido, cuando se clicka FUERA del dropdown
    if(this.nameOptionsX < 3 || this.nameOptionsX > 290 || this.nameOptionsY < 3 || this.nameOptionsY > 160){
      this.showNameOptions = false;
    } else {
      //Blur lento, cuando se clicka DENTRO del dropdown
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showNameOptions = false;
      }, 100);
    }
    
  }

  changeStarsWidth(event) {
    let bounds = document.getElementById("nameFilter-dropdown").getBoundingClientRect();
    this.nameOptionsX = Math.max(0, event.clientX - bounds.left);
    this.nameOptionsY = Math.max(0, event.clientY - bounds.top);
  }
}
