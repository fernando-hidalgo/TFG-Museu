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

  nameFilter: string[] = [];
  artistFilter: string[] = [];
  styleFilter: string[] = [];
  museumFilter: string[] = [];

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

  updateData(event){
    this.loadData(event.data)
  }

  loadData(data){
    this.searchResult = data;
    this.artworks = data.artworks;
    this.nameFilter = data.nameFilter;
    this.artistFilter = data.artistFilter;
    this.styleFilter = data.styleFilter;
    this.museumFilter = data.museumFilter;
  }
}
