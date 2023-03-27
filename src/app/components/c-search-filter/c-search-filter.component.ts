import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-c-search-filter',
  templateUrl: './c-search-filter.component.html',
  styleUrls: ['./c-search-filter.component.scss']
})
export class CSearchFilterComponent implements OnInit {
  @Input() searchResult;
  @Input() filter;
  @Input() type;
  @Output("updateData") updateData: EventEmitter<any> = new EventEmitter();

  timeout = null;
  showOptions = false;
  optionsX = 0
  optionsY = 0
  placeholder;

  currentUser = 2  //TODO: Debe ser cambiado por datos del usuario actualmente logueado

  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.setPlaceholder()
  }

  setPlaceholder() {
    const typeToPlaceholder = {
      nameFilter: 'Nombre...',
      artistFilter: 'Artista...',
      styleFilter: 'Estilo...',
      museumFilter: 'Museo...'
    };
    
    this.placeholder = typeToPlaceholder[this.type];
  }

  triggerFilterOptions(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.filterLimitOptions(event.target.value);
    }, 600);
  }

  filterLimitOptions(text){
    //Copia de los datos, para aplicarles cambios sin perder el original
    let filterAllOptions: string[] = this.searchResult[this.type];
    this.filter = filterAllOptions.filter(str => str.toLowerCase().includes(text.toLowerCase()));
  }

  filterSetOption(option){
    (document.getElementById(this.type) as HTMLInputElement).value = option;
    document.getElementById(this.type).style.pointerEvents = 'none';
    this.findFiltered()
  }

  findFiltered() {
    let params = {};

    if((document.getElementById('nameFilter') as HTMLInputElement).value != ""){
      params['nameFilter'] = (document.getElementById('nameFilter') as HTMLInputElement).value;
    }
    
    if((document.getElementById('artistFilter') as HTMLInputElement).value != ""){
      params['artistFilter'] = (document.getElementById('artistFilter') as HTMLInputElement).value;
    }

    if((document.getElementById('styleFilter') as HTMLInputElement).value != ""){
      params['styleFilter'] = (document.getElementById('styleFilter') as HTMLInputElement).value;
    }

    if((document.getElementById('museumFilter') as HTMLInputElement).value != ""){
      params['museumFilter'] = (document.getElementById('museumFilter') as HTMLInputElement).value;
    }

    if(this.currentUser){
      this.artworkService.findFilteredLogged(this.currentUser, params).subscribe(data => {
        this.updateData.emit({data});
      });
    } else {
      this.artworkService.findFiltered(params).subscribe(data => {
        this.updateData.emit({data});
      });
    }
  }

  onFocus(){
    this.showOptions = true;
  }

  onBlur(){
    //Blur rápido, cuando se clicka FUERA del dropdown
    if(this.optionsX < 3 || this.optionsX > 290 || this.optionsY < 3 || this.optionsY > 160){
      this.showOptions = false;
    } else {
      //Blur lento, cuando se clicka DENTRO del dropdown (Permite que de tiempo a seleccionar una opción)
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showOptions = false;
      }, 100);
    }
  }

  dropdownBounds(event) {
    let bounds = document.getElementById(`${this.type}-dropdown`).getBoundingClientRect();
    this.optionsX = Math.max(0, event.clientX - bounds.left);
    this.optionsY = Math.max(0, event.clientY - bounds.top);
  }

}
