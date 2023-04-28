import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtlistService } from 'src/app/services/artlist.service';
import { ArtworkService } from 'src/app/services/artwork.service';
import { AuthService } from 'src/app/services/auth.service';

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
  @Output("updateData") updateData: EventEmitter<any> = new EventEmitter();

  timeout = null;
  showOptions: boolean = false;
  optionsX: number = 0
  optionsY: number = 0
  placeholder: string;
  selectedIndex: number;
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
    let filterAllOptions: string[] = this.searchResult[this.type];
    this.filter = filterAllOptions.filter(str => str.toLowerCase().includes(text.toLowerCase()));
  }

  filterSetOption(option, index){
    if(this.mode === "artlist-edit"){
      (document.getElementById(this.type) as HTMLInputElement).value = '';
    } else {
      (document.getElementById(this.type) as HTMLInputElement).value = option;
      document.getElementById(this.type).style.pointerEvents = 'none';
    }
    this.selectedIndex = index;
    this.findFiltered()
  }

  findFiltered() {
    let params = {}

    if ((document.getElementById('nameFilter') as HTMLInputElement)?.value != "") {
      params['nameFilter'] = (document.getElementById('nameFilter') as HTMLInputElement)?.value;
    }

    if ((document.getElementById('artistFilter') as HTMLInputElement)?.value != "") {
      params['artistFilter'] = (document.getElementById('artistFilter') as HTMLInputElement)?.value;
    }

    if ((document.getElementById('styleFilter') as HTMLInputElement)?.value != "") {
      params['styleFilter'] = (document.getElementById('styleFilter') as HTMLInputElement)?.value;
    }

    if ((document.getElementById('museumFilter') as HTMLInputElement)?.value != "") {
      params['museumFilter'] = (document.getElementById('museumFilter') as HTMLInputElement)?.value;
    }

    if (this.mode === "search") {
      if (this.currentUser) params['currentUserId'] = this.currentUser

      this.artworkService.findFiltered(params).subscribe(data => {
        this.updateData.emit({ data });
      });
    }

    if (this.mode === "profile") {
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

    if(this.mode === "artlist") {
      this.route.params.subscribe(async urlParams => {
        let artlistId = urlParams['artlistId']
        if (this.currentUser) params['currentUserId'] = this.currentUser

        this.artlitsService.findFiltered(artlistId, params).subscribe(data => {
          this.updateData.emit({ data });
        });
      });
    }

    if(this.mode === "artlist-edit"){
      this.artworkService.getArtworkById(this.searchResult.artworksIds[this.selectedIndex]).subscribe(data => {
        this.updateData.emit({ data });
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
