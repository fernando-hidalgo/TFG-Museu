import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-v-home-search',
  templateUrl: './v-home-search.component.html',
  styleUrls: ['./v-home-search.component.scss']
})

export class VHomeSearchComponent implements OnInit {
  data: any;
  page: number = 1;
  currentUser = 2  //TODO: Debe ser cambiado por datos del usuario actualmente logueado

  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
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
  }

  loadData(data){
    this.data = data;
  }
}
