import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-v-home-search',
  templateUrl: './v-home-search.component.html',
  styleUrls: ['./v-home-search.component.scss']
})

export class VHomeSearchComponent implements OnInit {
  data: any;
  page: number = 1;
  currentUser: number

  constructor(private artworkService: ArtworkService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userMe()?.authId
    this.getAllArtworks()
  }

  getAllArtworks() {
    let params = {}
    if (this.currentUser) params['currentUserId'] = this.currentUser

    this.artworkService.getAllArtworks(params).subscribe(data => {
      this.loadData(data);
    });
  }

  updateData(event){
    this.loadData(event.data)
    this.page = 1;
  }

  loadData(data){
    this.data = data;
  }

  resetFilters(filterToReset: string[]) {
    filterToReset.forEach((filterName) => {
      const inputElement = document.getElementById(filterName)?.querySelector('input');
      
      if (inputElement) {
        inputElement.value = '';
        inputElement.style.pointerEvents = 'auto';
      }
    });
  }
  
  handleResetFilters() {
    const filterToReset = ['filter1', 'filter2', 'filter3', 'filter4'];
    this.resetFilters(filterToReset);
    this.getAllArtworks();
  }
  
}
