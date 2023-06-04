import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtlistService } from 'src/app/services/artlist.service';
import { ArtworkService } from 'src/app/services/artwork.service';
import { AuthService } from 'src/app/services/auth.service';
import { filterMode } from 'src/app/app.interfaces';

@Component({
  selector: 'app-c-search-filter',
  templateUrl: './c-search-filter.component.html',
  styleUrls: ['./c-search-filter.component.scss']
})
export class CSearchFilterComponent implements OnInit {
  @Input() searchResult;
  @Input() filter;
  @Input() type;
  @Input() mode;
  @Input() editListOptions;
  @Output("updateData") updateData: EventEmitter<any> = new EventEmitter();

  filterMode = filterMode;

  timeout = null;
  showOptions: boolean = false;
  optionsX: number = 0
  optionsY: number = 0
  placeholder: string;
  selectedId: number;
  currentUser: number

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private artlitsService: ArtlistService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userMe()?.authId
    this.setPlaceholder()
  }

  setPlaceholder() {
    const typeToPlaceholder = {
      nameFilter: 'Nombre...',
      artistFilter: 'Artista...',
      styleFilter: 'Técnica...',
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
    this.mode == filterMode.ARTLIST_EDIT ?
      this.editListOptions = this.searchResult.editListOptions.filter(obj => obj.name.toLowerCase().includes(text.toLowerCase()))
    :
      this.filter = this.searchResult[this.type].filter(str => str.toLowerCase().includes(text.toLowerCase()));
  }

  filterSetOption(option, id){
    const inputElement = document.getElementById(this.type) as HTMLInputElement;
    inputElement.value = this.mode === filterMode.ARTLIST_EDIT ? "" : option;
    inputElement.style.pointerEvents = this.mode === filterMode.ARTLIST_EDIT ? "auto" : "none";

    this.selectedId = id;
    this.findFiltered()
  }

  findFiltered() {
    let params = {}

    const filterFields = ['nameFilter', 'artistFilter', 'styleFilter', 'museumFilter'];
    for (const field of filterFields) {
      const value = (document.getElementById(field) as HTMLInputElement)?.value.trim();
      if (value) params[field] = value;
    }

    if (this.mode === filterMode.SEARCH) {
      if (this.currentUser) params['currentUserId'] = this.currentUser

      this.artworkService.findFiltered(params).subscribe(data => {
        this.updateData.emit({ data });
      });
    }

    if (this.mode === filterMode.PROFILE) {
      this.route.params.subscribe(async urlParams => {
        let profileId = urlParams['userId']

        if (this.currentUser) {
          if (profileId != this.currentUser) {
            params['currentUserId'] = this.currentUser
          } else {
            params['currentUserId'] = profileId
          }
        } //En caso de no estar logeado, params se envía vacio, así el ojo siempre sale gris

        this.artworkService.findFilteredArtworkRatedByUser(profileId, params).subscribe(data => {
          this.updateData.emit({ data });
        });
      });
    }

    if(this.mode === filterMode.ARTLIST) {
      this.route.params.subscribe(async urlParams => {
        let artlistId = urlParams['artlistId']
        if (this.currentUser) params['currentUserId'] = this.currentUser

        this.artlitsService.findFiltered(artlistId, params).subscribe(data => {
          this.updateData.emit({ data });
        });
      });
    }

    if(this.mode === filterMode.ARTLIST_EDIT){
      this.artworkService.getArtworkById(this.selectedId).subscribe(data => {
        this.updateData.emit({ data });
      });
    }
  }

  onFocus(){
    this.showOptions = true;
  }

  onBlur(){
    const drop = document.getElementById(`${this.type}-dropdown`)

    //Blur rápido, cuando se clicka FUERA del dropdown
    if(this.optionsX < 3 || this.optionsX + 5 > drop.offsetWidth || this.optionsX < 3 || this.optionsY + 5 > drop.offsetHeight){
      this.showOptions = false;
    } else {
      //Blur lento, cuando se clicka DENTRO del dropdown (Permite que de tiempo a seleccionar una opción)
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showOptions = false;
      }, 80);
    }
  }

  dropdownBounds(event) {
    let bounds = document.getElementById(`${this.type}-dropdown`).getBoundingClientRect();
    this.optionsX = Math.max(0, event.clientX - bounds.left);
    this.optionsY = Math.max(0, event.clientY - bounds.top);
  }

}
