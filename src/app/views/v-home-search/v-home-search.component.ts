import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';


@Component({
  selector: 'app-v-home-search',
  templateUrl: './v-home-search.component.html',
  styleUrls: ['./v-home-search.component.scss']
})

export class VHomeSearchComponent implements OnInit {
  artworks= []
  userRatings = [];

  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.getAllArtworks()
  }

  getAllArtworks() {
    this.artworkService.getAllArtworks().subscribe(data => {
      this.artworks = data;
    });
  }
}
